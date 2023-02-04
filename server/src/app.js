const express = require('express');
require('dotenv').config();

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const companyRouter = require('./routes/companyRouter');
const tokenRouter = require('./routes/tokenRouter');
const chartRouter = require('./routes/chartRouter');

const logger = require('./logger');
const { sequelize, price_his, dividend_his, position_his } = require('./models');
const {limiter} = require('./limit');
const { 
  getSimpleTotalSupply, 
  showAllTokenHolders, 
  getTokenBalance, 
  getTotalSupply, 
  allowToken, 
  isRestricted
} = require('./chainUtils/tokenUtils');
const {sendEtherToUser, sendWeiToUser, getEtherBalance} = require('./chainUtils/etherUtils');
const app = express();
app.set('port', process.env.PORT || 5050);
app.set('view engine', 'ejs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(
  cors({
    origin: [
      'http://localhost:3000', // cross-site인 모든 주소 기입
    ],
    credentials: true,
  }),
);

app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: true,
//     },
//   }),
// );

let stv=0;
let incomeRatio=0;
let dividend_ratio = 0.03;
let voted_ratio
let next_ratio
let chartHis = [[9.34],[1]];
let chartData
const setStv =()=>{stv = Math.random()*(0.01-(-0.0101))-0.01};
const setIncomeRatio =()=>{incomeRatio = Math.random()*(0.001-(-0.00101))-0.001};
const setVotedRatio =()=> {voted_ratio = (Math.random()*(0.05-(-0.05))-0.05).toFixed(3)};
let chart_his =(e)=>{ chartHis[0].push(e[0]);chartHis[1].push(e[1])}

let totalVolFrom = 0;
let totalVolTo = 0;
let circuitBreaker = false
setInterval(async() => {
  chartHis[1].forEach(element => {totalVolTo+=element});  
  setStv()
  chartData = {
    createdAt: new Date(),
    open: chartHis[0][0].toFixed(4),
    close:chartHis[0][chartHis[0].length-1].toFixed(4),
    high:chartHis[0].reduce((acc,cur)=>{
      if(acc<cur) return cur 
      else if(acc>=cur) return acc
    }).toFixed(4),
    low:chartHis[0].reduce((acc,cur)=>{
      if(acc>cur) return cur 
      else if(acc<=cur) return acc
    }).toFixed(4),
    totalVolTo:totalVolTo.toFixed(4),
    totalVolFrom:totalVolFrom.toFixed(4)
  }
  console.log(chartData);
  let volume = (1 + stv*10000)*(1+incomeRatio*10000)>0?(1 + stv*10000)*(1+incomeRatio*10000):0.01
  let price = chartHis[0][chartHis[0].length-1]>0.5?chartHis[0][chartHis[0].length-1]:0.5;
  chart_his([price * (1 + stv)*(1+incomeRatio) * (1+(1 + stv*1000)*(1+incomeRatio*1000)/1000000), volume])
  
  // circuitBreaker ? !circuitBreaker : circuitBreaker
  if(circuitBreaker) {
    circuitBreaker = false;
    const status = await isRestricted();
    if(status) {
      const result = await allowToken(); // 토큰 제한 해제 컨트랙트 메소드
      if(result) console.log("토큰 제한 해제 완료");
      else console.log("토큰 제한 해제 실패")
    }
  }
}, circuitBreaker ? 6000 : 500 );

setInterval(async () => {
  if(`${new Date()}`.slice(22,-32)==='00'){
    price_his.create(chartData)
    totalVolFrom = totalVolTo
    totalVolTo=0
    chartHis[0].splice(0,chartHis[0].length-1);
    chartHis[1].splice(0,chartHis[1].length-1);
  }
}, 1000);

//5분
setInterval(async () => {
  setIncomeRatio();
  setVotedRatio();
  let incomeRatioSet = incomeRatio>0 ? incomeRatio : 0.0001
  let income = (incomeRatioSet * chartHis[0][chartHis[0].length-1] * await getSimpleTotalSupply()).toFixed(10)
  console.log(income);
  let dividend = dividend_ratio * income;
  await dividend_his.create({ // 수정 필요
    company_wallet: process.env.ADMIN_ADDRESS,
    income: income,
    voted_ratio: voted_ratio, // 투표 결과 배당률
    dividend_ratio: dividend_ratio, // 직전 배당률 -> 수정해야함
    dividend: dividend, // 총 배당금
  })
  
  // 배당금 분배
  let tokenholders = await showAllTokenHolders();
  let totalSupply = await getTotalSupply();

  for(let i=0; i<tokenholders.length; i++) {
    if(tokenholders[i] !== process.env.ADMIN_ADDRESS) { // 거래소 제외
      const balance = await getTokenBalance(tokenholders[i]);
      const stake = balance / totalSupply;
      const personalDividend = String((dividend * stake).toFixed(18))
      await sendWeiToUser(tokenholders[i], personalDividend);
      // const result = await getEtherBalance(tokenholders[i]);
      // console.log(result);

      await position_his.create({
        user_wallet: tokenholders[i],
        order: "dividend",
        price: personalDividend,
        company_name: "exchange"
      })
    }
  }

  // 차기 배당률
  dividend_ratio = (dividend_ratio * (1 + Number(voted_ratio))).toFixed(4) 

}, 30000);

// app.get('/chart/total', async (req, res, next) => {
//   // const { offset, limit } = req.query;
//   try{
//     const total = await price_his.findAll();
//     if(!total) return res.status(400).json({message: "No such data"});
//     return res.status(200).json(total)
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// });

// app.get('/rtd', async (req, res, next) => {
//   try {
//     if(!chartData) return res.status(400).json({message: "No such data"});
//     return res.status(200).json(chartData)
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// });

app.use('/chart', chartRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/token', tokenRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} There is no Router`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), () => {
  logger.info(app.get('port'), 'is up and listening');
});

module.exports = { app, circuitBreaker, chartData };
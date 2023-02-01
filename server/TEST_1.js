const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const { sequelize } = require('../server/src/models');
const { users, companys, dividend_his, position_his, price_his } = require('./src/models');
const { getTotalSupply,getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('./src/chainUtils/tokenUtils');

app.set('port', process.env.PORT || 5051);
app.set('view engine', 'ejs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

  let stv=0;
  let minute=0;
  let incomeRatio=0;
  let dividend_ratio = 0.03;
  let chartHis = [[1.2],[100]];
  let chartDataFormatHis = [];
  
  const setStv =()=>{stv = Math.random()*(0.01-(-0.0101))-0.01;};
  const setIncomeRatio =()=>{incomeRatio = Math.random()*(0.05-(-0.051))-0.05;};
  const setDividendRatio = () => {dividend_ratio = (Math.random()*(0.05-(-0.05))-0.05).toFixed(2);};
  let chart_his =(e)=>{ chartHis[0].push(e[0]);chartHis[1].push(e[1]) }
  let totalVolFrom = 0;
  let totalVolTo = 0;

        setInterval(() => {
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
            let volume = 100 * (1 + stv*90)*(1+incomeRatio*90)>0?100 * (1 + stv*90)*(1+incomeRatio*90):1
            let price = chartHis[0][chartHis[0].length-1]>0.5?chartHis[0][chartHis[0].length-1]:0.5;
            chart_his([price * (1 + stv)*(1+incomeRatio) * (1+volume/10000000),
            volume])
        }, 1000);

        //1분
        setInterval(() => {
            // chartDataFormatHis.push(chartData);
            price_his.create(chartData)
            totalVolFrom = totalVolTo
            totalVolTo=0
            chartHis[0].splice(0,chartHis[0].length-1);
            chartHis[1].splice(0,chartHis[1].length-1);
        }, 6000);

        //5분
        setInterval(async () => {
          setIncomeRatio();
          setDividendRatio();
          let income = incomeRatio * chartHis[0][0] * getTotalSupply
          await dividend_his.create({
            company_wallet: process.env.ADMIN_ADDRESS,
            income: income,
            dividend_ratio:  dividend_ratio,
            dividend: dividend_ratio * income,
            next_ratio: dividend_ratio * incomeRatio
          })
        }, 3000);

app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;

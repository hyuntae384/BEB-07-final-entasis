const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const { sequelize } = require('../server/src/models');

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
  let volumeHis = [100,[]];
  let candleHis = [1.2];
  let volumeFormatHis = [];
  let candleFormatHis = [];
  let ST_CurrentVolume = 1;
  let ST_CurrentPrice = 100;
  const setStv =()=>{stv = Math.random()*(0.001-(-0.00101))-0.001;};
  const setMinute =()=>{minute = Math.random()*(0.005-(-0.00505))-0.005;};
  const setIncomeRatio =()=>{incomeRatio = Math.random()*(0.005-(-0.00505))-0.005;};


        let CP_his =(e)=>{
            candleHis.push(e)
            if(candleHis.length >= 60 ){
                candleFormatHis.push(candleData);
                candleHis.splice(0,candleHis.length-1);
            }}

        let CV_his =(e)=>{
            volumeHis[1].push(e)
            if(volumeHis[1].length >= 60 ){
                volumeFormatHis.push(volumeData);
                totalHisTo=0
                volumeHis[1].splice(0,volumeHis[1].length-1);
            }}

            let candleData = [];
            let volumeData = [];
            let totalHisFrom = 0;
            let totalHisTo = 0;

        setInterval(() => {

          volumeHis[1].forEach(element => {totalHisTo+=element});  
          setStv()
          candleData = [
            new Date().getHours()+ ':'+new Date().getMinutes()+ ':'+ new Date().getSeconds(),
            candleHis[0],
            candleHis[candleHis.length-1],
            candleHis.reduce((acc,cur)=>{
                    if(acc<cur) return cur 
                    else if(acc>=cur) return acc
                }),
            candleHis.reduce((acc,cur)=>{
                if(acc>cur) return cur 
                else if(acc<=cur) return acc
            })
        ]
          CP_his(candleHis[candleHis.length-1] * (1 + stv)*(1+incomeRatio) * (1+ST_CurrentVolume/100000000))
          volumeData = [
            0,
            volumeHis[0],
            totalHisTo,
            totalHisFrom
        ]    
          CV_his(volumeHis[0] * (1 + stv*90)*(1+incomeRatio*90))

          console.log(candleData,volumeData)
          
        }, 100);
  
        setInterval(() => {
          setMinute()
          // console.log(minute,'minute')
        }, 500);
        
        setInterval(() => {
          setIncomeRatio()
          // console.log(incomeRatio,'Income Ratio')
        }, 5000);
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;

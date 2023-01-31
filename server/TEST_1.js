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
  let chartHis = [[1.2],[100]];
  let chartDataFormatHis = [];

  const setStv =()=>{stv = Math.random()*(0.01-(-0.0101))-0.01;};
  const setIncomeRatio =()=>{incomeRatio = Math.random()*(0.05-(-0.051))-0.05;};

  let chart_his =(e)=>{ chartHis[0].push(e[0]) ;chartHis[1].push(e[1]) }
  let totalVolFrom = 0;
  let totalVolTo = 0;

        setInterval(() => {
          chartHis[1].forEach(element => {totalVolTo += element});  
          setStv()
          chartData = {
            'createdAt': new Date(),
            'open': chartHis[0][0].toFixed(2),
            'close':chartHis[0][chartHis[0].length-1].toFixed(2),
            'high':chartHis[0].reduce((acc,cur)=>{
                    if(acc<cur) return cur 
                    else if(acc>=cur) return acc
                    }).toFixed(2),
            'low':chartHis[0].reduce((acc,cur)=>{
                  if(acc>cur) return cur 
                  else if(acc<=cur) return acc
                  }).toFixed(2),
            'totalVolTo':totalVolTo.toFixed(4),
            'totalVolFrom':totalVolFrom.toFixed(4)
            }
            console.log(chartData)
            let volume = 100 * (1 + stv*90)*(1+incomeRatio*90)
            chart_his([chartHis[0][chartHis[0].length-1] * (1 + stv)*(1+incomeRatio) * (1+volume/10000000),
            volume])
        }, 1000);

        //1분
        setInterval(() => {
            chartDataFormatHis.push(chartData);
            totalVolFrom = totalVolTo
            totalVolTo=0
            chartHis[0].splice(0,chartHis[0].length-1);
            chartHis[1].splice(0,chartHis[1].length-1);
        }, 6000);

        //5분
        setInterval(() => {
          setIncomeRatio()

        }, 300000);

app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;

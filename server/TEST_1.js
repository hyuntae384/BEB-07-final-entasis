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
  const setStv =()=>{stv = Math.random()*(0.001-(-0.00101))-0.001;};
  const setMinute =()=>{minute = Math.random()*(0.005-(-0.00505))-0.005;};
  const setIncomeRatio =()=>{incomeRatio = Math.random()*(0.005-(-0.00505))-0.005;};

        let chart_his =(e)=>{
            chartHis[0].push(e[0])
            chartHis[1].push(e[1])
            if(chartHis[1].length >= 60 ){
              chartDataFormatHis.push(chartData);
              totalVolTo=0
              chartHis[0].splice(0,chartHis[0].length-1);
              chartHis[1].splice(0,chartHis[1].length-1);
            }}

            let totalVolFrom = 0;
            let totalVolTo = 0;

        setInterval(() => {
          chartHis[1].forEach(element => {totalVolTo+=element});  
          setStv()
          chartData ={
            'createdAt': new Date(),
            'open': chartHis[0][0],
            'close':chartHis[0][chartHis[0].length-1],
            'high':chartHis[0].reduce((acc,cur)=>{
                    if(acc<cur) return cur 
                    else if(acc>=cur) return acc
                    }),
            'low':chartHis[0].reduce((acc,cur)=>{
                  if(acc>cur) return cur 
                  else if(acc<=cur) return acc
                  }),
            'totalVolTo':totalVolTo,
            'totalVolFrom':totalVolFrom
            }
            console.log(chartData)

            let volume = chartHis[1][0] * (1 + stv*90)*(1+incomeRatio*90)
            chart_his([chartHis[0][chartHis[0].length-1] * (1 + stv)*(1+incomeRatio) * (1+volume/100000000),
            volume])
        }, 10);

        //1분
        setInterval(() => {
          setMinute()

          // console.log(minute,'minute')
        }, 600);

        //5분
        setInterval(() => {
          setIncomeRatio()

          // console.log(incomeRatio,'Income Ratio')
        }, 3000);

app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;

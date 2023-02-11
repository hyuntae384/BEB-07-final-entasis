const express = require('express');
require('dotenv').config();

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 트래픽 제어
const limit = require('express-rate-limit');

const userRouter = require('./routes/userRouter');
const companyRouter = require('./routes/companyRouter');
const entaRouter = require('./routes/entaRouter');
const bebRouter = require('./routes/bebRouter');
const leoRouter = require('./routes/leoRouter');
const chartRouter = require('./routes/chartRouter');
const rtdRouter = require('./routes/rtdRouter');
const logger = require('./logger');
const { sequelize, price_his, dividend_his, position_his, enta_his, beb_his, leo_his } = require('./models');
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
      'http://entasis.s3-website.ap-northeast-2.amazonaws.com/',
      'http://52.78.173.200:5050'
    ],
    credentials: true,
  }),
);

// 리미트분리
app.use(limit({
  windowMs: 60 * 1000,
  max: 20000,
  delayMs: 100,
  handler(req,res) {
      res.status(this.statusCode).json({
          code: this.statusCode,
          message: "Only 100 requests per minute."
      });
  }
}));


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


app.use('/rtd',rtdRouter);
app.use('/chart', chartRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/enta', entaRouter);
app.use('/beb', bebRouter);
app.use('/leo', leoRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} There is no Router`);
  err.status = 404;
  next(err);
});


// 에러로깅
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

// 서버 리스너
app.listen(app.get('port'), () => {
  logger.info(app.get('port'), 'is up and listening');
});

module.exports = app;

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
const { sequelize } = require('./models');

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

app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/token', tokenRouter);
app.use('/chart', chartRouter);

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

module.exports = app;
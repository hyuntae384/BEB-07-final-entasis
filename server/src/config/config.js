require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "entasis",
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "entasis_test",
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "entasis_production",
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  }
}

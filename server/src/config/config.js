require('dotenv').config();

module.export = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "database_development", // DB 생성 후 수정 필요
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "database_test",
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "database_production",
    host: "ls-4f88b21a763ede850c8d8cc1f54e3c91c3e8f62a.cfasb3iuscbm.ap-northeast-2.rds.amazonaws.com",
    dialect: "mysql",
    timezone: '+09:00',
  }
}

require('dotenv').config();

module.exports = {


    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.MYSQL_DB,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

    // {
    //     "development": {
    //       "username": "root",
    //       "password": null,
    //       "database": "database_development",
    //       "host": "127.0.0.1",
    //       "dialect": "mysql"
    //     },
    //     "test": {
    //       "username": "root",
    //       "password": null,
    //       "database": "database_test",
    //       "host": "127.0.0.1",
    //       "dialect": "mysql"
    //     },
    //     "production": {
    //       "username": "root",
    //       "password": null,
    //       "database": "database_production",
    //       "host": "127.0.0.1",
    //       "dialect": "mysql"
    //     }
    //   }

}
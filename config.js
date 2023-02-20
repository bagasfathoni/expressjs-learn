const mysql = require('mysql');
const appConfig = require('./app_config.json');

// MySQL Config
const mysqlConn = mysql.createConnection({
	host: appConfig.mysql.host,
	port: appConfig.mysql.port,
	database: appConfig.mysql.db,
	user: appConfig.mysql.user,
	password: appConfig.mysql.pass,
	ssl: appConfig.mysql.ssl,
});
module.exports = mysqlConn;

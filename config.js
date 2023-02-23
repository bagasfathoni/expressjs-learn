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

const swaggerConfig = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'ABC Store API Docs',
			version: '0.1.0',
			description: 'This is a simple CRUD API application made with Express and documented with Swagger',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
		},
		servers: [
			{
				url: 'http://localhost:8080',
			},
		],
	},
	apis: ['./routes/*.js', './dto/*.js'],
};

module.exports = {mysqlConn, swaggerConfig};

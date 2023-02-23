const mysql = require('mysql');
const appConfig = require('./app_config.json');
const swaggerDocs = require('./swagger');
const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

// MySQL Config
const mysqlConn = mysql.createConnection({
	host: appConfig.mysql.host,
	port: appConfig.mysql.port,
	database: appConfig.mysql.db,
	user: appConfig.mysql.user,
	password: appConfig.mysql.pass,
	ssl: appConfig.mysql.ssl,
});

// Swagger config starts here
const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, swaggerDocs);
module.exports = {mysqlConn, swaggerAutogen};

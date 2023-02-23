const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const open = require('open');

// Init ExpressJS config
const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Init created router
app.use('/api/customer', require('./routes/customer'));
app.use('/api/product', require('./routes/product'));
app.use('/api/trx', require('./routes/trx'));

// Run ExpressJS app
const {swaggerConfig} = require('./config');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerConfig)));
app.listen(8080, () => {
	// open('http://localhost:8080/docs');
	console.log('running server on :8080');
});

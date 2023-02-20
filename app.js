const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Init ExpressJS config
const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Init created router
const customerRouter = require('./routes/customer');
app.use('/api/customer', customerRouter);
const productRouter = require('./routes/product');
app.use('/api/product', productRouter);

// Run ExpressJS app
app.listen(8080, () => {
	console.log('running server on :8080');
});

module.exports = app;

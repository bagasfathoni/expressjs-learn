const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

const CustomerController = require('../controller/customer');
const customerController = new CustomerController();

/* GET all customers. */
router.get('/', customerController.getAllCustomers);

/* GET customer by matching value */
router.get('/search', customerController.searchMatchingCustomer);

/* INSERT one customer */
router.post('/insert_one_customer', customerController.insertOneCustomer);

module.exports = router;

const express = require('express');
const router = express.Router();
const {swaggerConfig} = require('../config');
router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

const CustomerController = require('../controller/customer');
const customerController = new CustomerController();

/* GET all customers. */
router.get(
	'/',
	// #swagger.tags = ['Customer']
	// #swagger.summary = List all customers
	/* #swagger.responses[200] = {
			content :{
				"application/json":{
					schema: {
						type: "object",
						$ref: "#/definitions/BaseResponse",
						properties:{
							data: {
								$ref: "#/definitions/Customers"
								}
							}
						}
					}
				}
	}
	*/
	customerController.getAllCustomers
);

/* GET customer by matching value */
router.get(
	'/search',
	// #swagger.tags = ['Customer']
	// #swagger.summary = Get customer using matching email, name, etc.
	/* #swagger.parameters['name'] = {
			in: 'query',
			type:'string',
	}
	*/
	/* #swagger.parameters['email'] = {
			in: 'query',
			type:'string'
	}
	*/
	/* #swagger.responses[200] = {
			content :{
				"application/json":{
					schema: {
						type: "object",
						$ref: "#/definitions/BaseResponse",
						properties:{
							data: {
								$ref: "#/definitions/Customers"
								}
							}
						}
					}
				}
	}
	*/
	customerController.searchMatchingCustomer
);

/* INSERT one customer */
router.post(
	'/insert_one_customer',
	// #swagger.tags = ['Customer']
	// #swagger.summary = Insert one customer
	/* #swagger.parameters['']={
		in: 'body',
		schema:{
			$name: "heru widianto",
			$email:"heru.widianto@mail.com"
			},
		required: ["name", "email"]
		}
	 */
	/* #swagger.responses[200] = {
			content :{
				"application/json":{
					schema: {
						type: "object",
						$ref: "#/definitions/BaseResponse",
						properties:{
							data: {
								type: "integer",
								example: 1
							}
						}
				}
			}
		}
	}
	*/
	customerController.insertOneCustomer
);

module.exports = router;

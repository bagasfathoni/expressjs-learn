const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

const ProductController = require('../controller/product');
const productController = new ProductController();

/* GET all products. */
router.get(
	'/',
	// #swagger.tags = ['Product']
	// #swagger.summary = List all products
	/* #swagger.responses[200] = {
			content :{
				"application/json":{
					schema: {
						type: "object",
						$ref: "#/definitions/BaseResponse",
						properties:{
							data: {
								$ref: "#/definitions/Products"
								}
							}
						}
					}
				}
	}
	*/
	productController.getAllProducts
);

/* GET product by matching value */
router.get(
	'/search',
	// #swagger.tags = ['Product']
	// #swagger.summary = Get product using matching id, name, etc.
	/* #swagger.parameters['product_name'] = {
			in: 'query',
			type:'string',
	}
	*/
	/* #swagger.parameters['product_id'] = {
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
								$ref: "#/definitions/Products"
								}
							}
						}
					}
				}
	}
	*/
	productController.searchMatchingProducts
);

/* INSERT one product*/
// router.route('/insert_one_customer').post(productController.insertOneCustomer);

module.exports = router;

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
router.get('/', productController.getAllProducts);

/* GET product by matching value */
router.get('/search', productController.searchMatchingProducts);

/* INSERT one product*/
// router.route('/insert_one_customer').post(productController.insertOneCustomer);

module.exports = router;

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the book
 *         product_id:
 *           type: string
 *           description: Unique id for product
 *         product_name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: float
 *           description: Product price
 *       example:
 *         id: 1
 *         product_id: b7977d77e62549ffb6521005970d3fbb
 *         product_name: Meja Kayu
 *         price: 50000.00
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API to manage products records
 * /api/product/:
 *   get:
 *     summary: Lists all the products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List all the products
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       $ref: '#/components/schemas/Product'
 *                   example:
 *                     data:
 *                       $ref: '#/components/schemas/Product/example'
 */

/* GET all products. */
router.get('/', productController.getAllProducts);

/* GET product by matching value */
router.get('/search', productController.searchMatchingProducts);

/* INSERT one product*/
// router.route('/insert_one_customer').post(productController.insertOneCustomer);

module.exports = router;

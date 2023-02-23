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

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the customer
 *         customer_id:
 *           type: string
 *           description: Unique id for customer
 *         customer_name:
 *           type: string
 *           description: Customer name
 *         email:
 *           type: string
 *           description: Customer email
 *       example:
 *         id: 1
 *         customer_id: b7977d77e62549ffb6521005970d3fbb
 *         customer_name: AGUS SUYONO
 *         email: agus.suyono@mail.com
 */

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API to manage customers records
 * /api/customer/:
 *   get:
 *     summary: Lists all the customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: List all the customers
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   additionalProperties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         $ref: '#/components/schemas/Customer'
 *                   examples:
 *                     data:
 *                       $ref: '#/components/schemas/Customer/example'
 * /api/customer/search:
 *   get:
 *     summary: Search matching customers
 *     tags: [Customer]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search any matching customer using name, email, etc.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       $ref: '#/components/schemas/Customer'
 *                   example:
 *                     data:
 *                       $ref: '#/components/schemas/Customer/example'
 * /api/customer/insert_one_customer:
 *   post:
 *     summary: Insert one customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               name: DEDI JAYA
 *               email: dedi.jaya@mail.com
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: int
 *
 */

/* GET all customers. */
router.get('/', customerController.getAllCustomers);

/* GET customer by matching value */
router.get('/search', customerController.searchMatchingCustomer);

/* INSERT one customer */
router.post('/insert_one_customer', customerController.insertOneCustomer);

module.exports = router;

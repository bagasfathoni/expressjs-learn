const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

const TrxController = require('../controller/trx');
const trxController = new TrxController();

/**
 * @swagger
 * components:
 *   schemas:
 *     TrxRequest:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: string
 *           description: Unique id for customer
 *         order:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *               qty:
 *                 type: int
 *       example:
 *         customer_id: b7977d77e62549ffb6521005970d3fbb
 *         order:
 *           - product_id: b7977d77e62549ffb6521005970d3fbb
 *           - qty: 3
 */

/**
 * @swagger
 * tags:
 *   name: Trx
 *   description: API to manage trx
 * /api/trx/generate_one_trx:
 *   post:
 *     summary: Generate one transaction
 *     tags: [Trx]
 *     responses:
 *       200:
 *         description: Generate one transaction
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       $ref: '#/components/schemas/Trx'
 *                   example:
 *                     data:
 *                       type: int
 */

/* GENERATE one trx. */
router.post('/generate_one_trx', trxController.generateOneTrx);

module.exports = router;

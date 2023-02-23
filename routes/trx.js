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

/* GENERATE one trx. */
router.post(
	'/generate_one_trx',
	// #swagger.tags = ['Trx']
	/* #swagger.parameters['body']={
		in: 'body',
		schema:{
			$customer_id: "26c9483e69e7411282501c038c607101",
			$order:[
				{
					$product_id:"d835aef63441456bb25722fecb3e26a4",
					$qty: 4
				}
			]
			},
		}
	 */
	trxController.generateOneTrx
);

module.exports = router;

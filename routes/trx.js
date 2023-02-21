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
router.post('/generate_one_trx', trxController.generateOneTrx);

module.exports = router;

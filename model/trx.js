const db = require('../config');

class TrxModel {
	createTrxMaster = (sqlResult, args) => {};
	createTrxProduct = (sqlResult, args) => {
		// let sql = db.format('INSERT into abc_store.trx_product(product_id, qty, total) VALUES (?,?,?);', [args['product_id'], args['qty'], ])
	};
}

module.exports = TrxModel;

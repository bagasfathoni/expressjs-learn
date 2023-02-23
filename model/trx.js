const {mysqlConn: db} = require('../config');
class TrxModel {
	createTrx = (trxResult, args) => {
		db.beginTransaction(err => {
			if (err) {
				trxResult(err, null);
			}
			this.#createTrxProduct((err, trxProductResult) => {
				if (err) {
					return db.rollback(() => {
						trxResult(err, null);
					});
				}
				this.#createTrxMaster((err, trxMasterResult) => {
					if (err) {
						return db.rollback(() => {
							trxResult(err, null);
						});
					}
					db.commit(err => {
						if (err) {
							return db.rollback(() => {
								trxResult(err, null);
							});
						}
					});
					trxResult(null, null);
				}, args['trxMasterArgs']);
			}, args['trxProductArgs']);
		});
	};

	#createTrxMaster = (trxMasterSqlResult, args) => {
		let sql = db.format('INSERT into abc_store.trx_master(customer_id,trx_id, total_amount, created_at) VALUES ');
		let valueArgs = '';
		for (const a of args) {
			valueArgs += db.format('(?,?,?,?), ', [a['customer_id'], a['trx_id'], a['total_amount'], a['created_at']]);
		}
		sql = sql + valueArgs.slice(0, -2);
		console.log(`trx master sql: ${sql}`);
		db.query(sql, (error, results) => {
			if (error) {
				return db.rollback(() => {
					trxMasterSqlResult(error, null);
				});
			}
			trxMasterSqlResult(null, results.insertId);
		});
	};

	#createTrxProduct = (trxProductSqlResult, args) => {
		let sql = db.format('INSERT into abc_store.trx_product(trx_id, product_id, qty, total) VALUES ');
		let valueArgs = '';
		for (const a of args['trx']) {
			valueArgs += db.format('(?,?,?,?), ', [args['trx_id'], a['product_id'], a['qty'], a['total']]);
		}
		sql = sql + valueArgs.slice(0, -2);
		console.log(`trx product sql: ${sql}`);
		db.query(sql, (error, results) => {
			if (error) {
				return db.rollback(() => {
					trxProductSqlResult(error, null);
				});
			}
			trxProductSqlResult(null, results.insertId);
		});
	};
}

module.exports = TrxModel;

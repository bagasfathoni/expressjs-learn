const db = require('../config');

class ProductModel {
	insertOneProduct = (sqlResult, args) => {};

	getAllProducts = sqlResult => {
		const sql = 'SELECT * FROM abc_store.product;';
		db.query(sql, (error, results) => {
			if (error) {
				sqlResult(error, null);
			}
			sqlResult(null, results);
		});
	};

	getProductBy = (sqlResult, args) => {
		let sql = 'SELECT * FROM abc_store.product WHERE 1 ';
		let whereQuery = '';
		for (const arg of args) {
			whereQuery += `AND ${arg['key']}='${arg['value']}' `;
		}
		sql = sql + whereQuery;
		db.query(sql, (error, results) => {
			if (error) {
				sqlResult(error, null);
			}
			sqlResult(null, results);
		});
	};

	getMatchingProductBy = (sqlResult, args) => {
		let sql = 'SELECT * FROM abc_store.product WHERE 1 ';
		let whereQuery = '';
		for (const arg of args) {
			whereQuery += `AND ${arg['key']} like '%${arg['value']}%' `;
		}
		sql = sql + whereQuery;
		db.query(sql, (error, results) => {
			if (error) {
				sqlResult(error, null);
			}
			sqlResult(null, results);
		});
	};
}

module.exports = ProductModel;

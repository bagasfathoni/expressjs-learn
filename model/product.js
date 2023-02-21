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
			whereQuery += `AND ${arg['key']} IN ( `;
			for (const v of arg['values']) {
				whereQuery += `'${v['value']}', `;
			}
			whereQuery = whereQuery.slice(0, -2);
			whereQuery += `)`;
		}
		sql = sql + whereQuery;
		console.log('sql: ', sql);
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
			for (const v of arg['values']) {
				whereQuery += `AND ${arg['key']} like '%${v['value']}%' `;
			}
		}
		sql = sql + whereQuery;
		console.log('sql: ', sql);
		db.query(sql, (error, results) => {
			if (error) {
				sqlResult(error, null);
			}
			sqlResult(null, results);
		});
	};
}

module.exports = ProductModel;

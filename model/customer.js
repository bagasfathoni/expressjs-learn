const db = require('../config');
const {generateUuid} = require('../utils/misc');

class CustomerModel {
	insertOneCustomer = (sqlResult, args) => {
		const uuid = generateUuid();
		let sql = db.format('INSERT into abc_store.customer(customer_id, customer_name, email) VALUES (?, ?, ?);', [uuid, args['name'], args['email']]);
		db.beginTransaction(err => {
			if (err) {
				sqlResult(err, null);
			}
			db.query(sql, (error, results) => {
				if (error) {
					return db.rollback(() => {
						sqlResult(error, null);
					});
				}
				db.commit(err => {
					if (err) {
						return db.rollback(() => {
							sqlResult(err, null);
						});
					}
				});
				sqlResult(null, results.insertId);
			});
		});
	};

	getAllCustomersData = sqlResult => {
		const sql = 'SELECT * FROM abc_store.customer;';
		db.query(sql, (error, results) => {
			if (error) {
				sqlResult(error, null);
			}
			sqlResult(null, results);
		});
	};

	getCustomerBy = (sqlResult, args) => {
		console.log(args);
		let sql = 'SELECT * FROM abc_store.customer WHERE 1 ';
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

	getMatchingCustomerBy = (sqlResult, args) => {
		let sql = 'SELECT * FROM abc_store.customer WHERE 1 ';
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

module.exports = CustomerModel;

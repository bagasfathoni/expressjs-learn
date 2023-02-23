const CustomerModel = require('../model/customer');
const DtoResponse = require('../dto/response');
const DtoRequest = require('../dto/response');

class CustomerController {
	constructor() {
		this.customerModel = new CustomerModel();
		this.dtoResponse = new DtoResponse();
		this.dtoRequest = new DtoRequest();
	}

	insertOneCustomer = (req, res) => {
		this.customerModel.insertOneCustomer(
			(err, data) => {
				err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Insert One Customer SUCCESS', data);
			},
			{'name': req.body.name, 'email': req.body.email}
		);
	};

	getAllCustomers = (req, res) => {
		this.customerModel.getAllCustomersData((err, data) => {
			err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Get All Customer SUCCESS', data);
		});
	};

	searchMatchingCustomer = (req, res) => {
		const columnValue = getCustomerColumnValue(req.query);
		this.customerModel.getMatchingCustomerBy((err, data) => {
			err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Search Matching Customers SUCCESS', data);
		}, columnValue);
	};
}
module.exports = CustomerController;

const getCustomerColumnValue = keys => {
	const res = [];
	for (const key in keys) {
		switch (key) {
			case 'email':
				if (keys['email'] instanceof Array) {
					const vals = [];
					for (const v of keys['email']) {
						let val = {'value': v};
						vals.push(val);
						res.push({'key': 'email', 'values': vals});
					}
				} else {
					let val = {'value': keys['email']};
					res.push({'key': 'email', 'values': [val]});
				}
				continue;
			case 'name':
				if (keys['name'] instanceof Array) {
					const vals = [];
					for (const v of keys['name']) {
						let val = {'value': v};
						vals.push(val);
						res.push({'key': 'name', 'values': vals});
					}
				} else {
					let val = {'value': keys['name']};
					res.push({'key': 'customer_name', 'values': [val]});
				}
				continue;
			default:
				continue;
		}
	}
	return res;
};

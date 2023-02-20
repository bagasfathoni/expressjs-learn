const ProductModel = require('../model/product');
const DtoResponse = require('../dto/response');
const DtoRequest = require('../dto/response');

class ProductController {
	constructor() {
		this.productModel = new ProductModel();
		this.dtoResponse = new DtoResponse();
		this.dtoRequest = new DtoRequest();
	}

	// insertOneCustomer = (req, res) => {
	// 	this.productModel.insertOneCustomer(
	// 		(err, data) => {
	// 			err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Insert One Customer SUCCESS', data);
	// 		},
	// 		{'name': req.body.name, 'email': req.body.email}
	// 	);
	// };

	getAllProducts = (req, res) => {
		this.productModel.getAllProducts((err, data) => {
			err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Get All Products SUCCESS', data);
		});
	};

	searchMatchingProducts = (req, res) => {
		const columnValue = getProductColumnValue(req.query);
		this.productModel.getMatchingProductBy((err, data) => {
			err ? this.dtoResponse.generic500Response(res, err.message) : this.dtoResponse.generic200Response(res, 'Search Matching Products SUCCESS', data);
		}, columnValue);
	};
}
module.exports = ProductController;

const getProductColumnValue = keys => {
	const res = [];
	for (const key in keys) {
		switch (key) {
			case 'product_id':
				res.push({'key': 'product_id', 'value': keys['product_id']});
				continue;
			case 'name':
				res.push({'key': 'product_name', 'value': keys['name']});
				continue;
			default:
				continue;
		}
	}
	return res;
};

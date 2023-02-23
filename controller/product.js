const ProductModel = require('../model/product');
const DtoResponse = require('../dto/response');
const DtoRequest = require('../dto/response');

class ProductController {
	constructor() {
		this.productModel = new ProductModel();
		this.dtoResponse = new DtoResponse();
		this.dtoRequest = new DtoRequest();
	}

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
				if (keys['product_id'] instanceof Array) {
					const vals = [];
					for (const v of keys['product_id']) {
						let val = {'value': v};
						vals.push(val);
						res.push({'key': 'product_id', 'values': vals});
					}
				} else {
					let val = {'value': keys['product_id']};
					res.push({'key': 'product_id', 'values': [val]});
				}
				continue;
			case 'product_name':
				if (keys['product_name'] instanceof Array) {
					const vals = [];
					for (const v of keys['product_name']) {
						let val = {'value': v};
						vals.push(val);
						res.push({'key': 'product_name', 'values': vals});
					}
				} else {
					let val = {'value': keys['product_name']};
					res.push({'key': 'product_name', 'values': [val]});
				}
				continue;
			default:
				continue;
		}
	}
	return res;
};

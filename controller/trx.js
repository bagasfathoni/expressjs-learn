const TrxModel = require('../model/trx');
const ProductModel = require('../model/product');
const CustomerModel = require('../model/customer');
const DtoResponse = require('../dto/response');
const DtoRequest = require('../dto/response');
const {getCurrentTime, generateSha256Hash} = require('../utils/misc');

class TrxController {
	constructor() {
		this.customerModel = new CustomerModel();
		this.productModel = new ProductModel();
		this.trxModel = new TrxModel();
		this.dtoResponse = new DtoResponse();
		this.dtoRequest = new DtoRequest();
	}

	generateOneTrx = (req, res) => {
		const trxIdHash = generateSha256Hash(req.body.customer_id, getCurrentTime());
		const prodReqBody = parseProductRequestBody(req.body.order);
		this.productModel.getProductBy((err, prodRes) => {
			if (err) {
				this.dtoResponse.generic500Response(res, err.message);
			}
			this.customerModel.getCustomerBy(
				(err, customerRes) => {
					if (err) {
						this.dtoResponse.generic500Response(res, err.message);
					}
					const trxArgs = parseTrxRequest(trxIdHash, prodRes, customerRes, prodReqBody);
					this.trxModel.createTrx((err, result) => {
						if (err) {
							this.dtoResponse.generic500Response(res, err.message);
						}
						this.dtoResponse.generic200Response(res, 'Generate One Trx SUCCESS', result);
					}, trxArgs);
				},
				[{'key': 'customer_id', 'values': [{'value': req.body.customer_id}]}]
			);
		}, prodReqBody);
	};
}

module.exports = TrxController;

const parseTrxRequest = (trxId, productResult, customerResult, productRequest) => {
	const trxProductRequest = parseTrxProdRequestBody(trxId, productResult, productRequest);
	return {
		'trxProductArgs': trxProductRequest,
		'trxMasterArgs': parseTrxMasterRequestBody(trxId, customerResult, trxProductRequest),
	};
};

const parseProductRequestBody = body => {
	const parsedProductReqBody = [];
	const productVals = [];
	for (const b of body) {
		let val = {'value': b['product_id'], 'qty': b['qty']};
		productVals.push(val);
	}
	let res = {'key': 'product_id', 'values': productVals};
	parsedProductReqBody.push(res);
	return parsedProductReqBody;
};

const parseTrxProdRequestBody = (trxId, productResult, productRequest) => {
	const parsedTrxProductReqBody = {
		'trx_id': trxId,
		'trx': [],
	};
	for (let i = 0; i < productResult.length; i++) {
		if (productResult[i]['product_id'] === productRequest[0]['values'][i]['value']) {
			let res = {
				'product_id': productResult[i]['id'],
				'qty': productRequest[0]['values'][i]['qty'],
				'total': productRequest[0]['values'][i]['qty'] * productResult[i]['price'],
			};
			parsedTrxProductReqBody.trx.push(res);
		} else {
			continue;
		}
	}
	return parsedTrxProductReqBody;
};

const parseTrxMasterRequestBody = (trxId, customers, trxProduct) => {
	const parsedTrxMasterReqBody = [];
	const totalAmount = getTotalAmount(trxProduct);
	for (const c of customers) {
		let res = {
			'customer_id': c['id'],
			'trx_id': trxId,
			'total_amount': totalAmount,
			'created_at': getCurrentTime(),
		};
		parsedTrxMasterReqBody.push(res);
	}
	console.log('parsedTrxMasterReqBody: ', parsedTrxMasterReqBody);
	return parsedTrxMasterReqBody;
};

const getTotalAmount = trxProduct => {
	let totalAmount = 0;
	for (const t of trxProduct['trx']) {
		totalAmount = totalAmount + t['total'];
	}
	return totalAmount;
};

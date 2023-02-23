const swaggerDocs = {
	info: {
		version: '1.0.0',
		title: 'ABC Store API Docs',
		description: 'Simple CRUD API application',
	},
	host: 'localhost:8080',
	basePath: '',
	schemes: ['http', 'https'],
	tags: [],
	definitions: {},
};

const responsesDoc = {
	'definitions': {
		'BaseResponse': {
			'status': 'OK',
			'message': 'Get SUCCESS',
		},
	},
};

const customerDoc = {
	'tags': {
		'name': 'Customer',
		'description': 'Customer API',
	},
	'definitions': {
		'Customer': {
			'id': 1,
			'customer_id': 'b7977d77e62549ffb6521005970d3fbb',
			'customer_name': 'AGUS SUYONO',
			'email': 'agus.suyono@mail.com',
			'is_active': 1,
		},
		'Customers': [
			{
				$ref: '#/definitions/Customer',
			},
		],
	},
};

const productDoc = {
	'tags': {
		'name': 'Product',
		'description': 'Product API',
	},
	'definitions': {
		'Product': {
			'id': 1,
			'product_id': 'b4838994b62240bf92de2dd7e3d56123',
			'product_name': 'MEJA KAYU',
			'price': 10000,
			'is_active': 1,
		},
		'Products': [
			{
				$ref: '#/definitions/Product',
			},
		],
	},
};

const trxDoc = {
	'tags': {
		'name': 'Trx',
		'description': 'Trx API',
	},
	'definitions': {
		// 'Product': {
		// 	'id': 1,
		// 	'product_id': 'b4838994b62240bf92de2dd7e3d56123',
		// 	'product_name': 'MEJA KAYU',
		// 	'price': 10000,
		// 	'is_active': 1,
		// },
	},
};
swaggerDocs['tags'].push(customerDoc['tags'], productDoc['tags'], trxDoc['tags']);
swaggerDocs['definitions'] = {...responsesDoc['definitions'], ...customerDoc['definitions'], ...productDoc['definitions'], ...trxDoc['definitions']};

module.exports = swaggerDocs;

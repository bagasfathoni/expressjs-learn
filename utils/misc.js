const {v4: uuid} = require('uuid');

const generateUuid = () => {
	let result = uuid();
	result = result.replace(/-/g, '');
	return result;
};

module.exports = {generateUuid};

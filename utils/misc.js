const {v4: uuid} = require('uuid');
const crypto = require('crypto');

const generateUuid = () => {
	let result = uuid();
	result = result.replace(/-/g, '');
	return result;
};

const getCurrentTime = () => {
	const now = new Date();
	return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const generateSha256Hash = (...args) => {
	let rawText = '';
	for (const a of args) {
		rawText += String(a);
	}
	const hashText = crypto.createHash('sha256').update(rawText).digest('hex');
	return hashText;
};

module.exports = {generateSha256Hash, generateUuid, getCurrentTime};

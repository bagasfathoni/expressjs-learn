class DtoResponse {
	generic200Response = (resp, message, data) => {
		resp.status(200).send({
			status: 'OK',
			message: message,
			data: data,
		});
	};

	generic500Response = (resp, errorMessage) => {
		resp.status(500).send({
			status: 'FAILED',
			message: errorMessage,
		});
	};
}

module.exports = DtoResponse;

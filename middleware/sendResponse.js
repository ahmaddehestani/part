const sendResponse = (res, statusCode, result) => {
	res.statusCode = statusCode;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ result }));
};

module.exports = sendResponse;

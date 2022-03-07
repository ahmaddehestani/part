/**
 * This funcction send response tou ser
 * @param {*} res 
 * @param {number} statusCode 
 * @param {*} result 
 */
const sendResponse = (res, statusCode, result) => {
	res.statusCode = statusCode;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ result }));
};

module.exports = sendResponse;

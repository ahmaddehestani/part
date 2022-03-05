const jwt = require('jsonwebtoken');
const sendResponse = require('./sendResponse');

const authorization = (role) => {
	return (req, res, next) => {
		try {
			const token = req.headers['x-auth'];
			let extractedToken = jwt.verify(token, '123qwe');
			if (role != null && (!extractedToken || extractedToken?.role !== role)) {
				throw new Error('Access Denied');
			}
			req.session = extractedToken;
			next();
		} catch (error) {
			return sendResponse(res, 403, { message: error?.message || error });
		}
	};
}

module.exports = authorization
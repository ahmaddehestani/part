const { insertUser, getUser, usersList } = require('../models/user.model');
const sendResponse = require('../../../middleware/sendResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_KEY, JWT_EXPIRE_IN, ROLES } = require('../constants');


/**
 * This function hash password of user and insert user object to database
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message to user
 */
module.exports.signup = async (req, res) => {
	const user = req.data;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
	try {
		await insertUser(user);
		const result = { message: 'User registerd successfully!' };
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function check credential of user
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the token
 */
module.exports.login = async (req, res) => {
	try {
		const { password: inputPasswod, email: inputEmail } = req.data;
		const user = await getUser(inputEmail);
		const isValidPassword = await bcrypt.compare(inputPasswod, user.password);
		if (!isValidPassword) {
			throw new Error('Invalid password!')
		}
		const token = jwt.sign({ role: user.role, email: user.email }, JWT_KEY, { expiresIn: JWT_EXPIRE_IN });
		const result = { message: 'Login successfully', token };
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 401, error);
	}
};

/**
 * This function send list of users based on role
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object of users list
 */
module.exports.list = async (req, res) => {
	try {
		
		const { role } = req.session;
		let result = {};
		if (role == ROLES.ADMIN) {
			result = await usersList(req.data?.role || null);
		}
		else if (role === ROLES.SUPPORT) {
			result = await usersList(ROLES.EMPLOYEE);
		}
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 401, error);
	}
};

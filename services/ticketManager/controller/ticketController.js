const {
	addTickettoDB,
	viewTicketsDB,
	AssignmentTicketsDB,
	writeCommentDB,
	viewCommentDB
} = require('../models/ticket.model');
const sendResponse = require('../../../middleware/sendResponse');

/**
 * This function add ticket to the database
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message
 */
module.exports.addTicket = async (req, res) => {
	const user = req.session;
	try {
		const result = await addTickettoDB(user, req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function show list of ticket based on queryparamters 
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object of tickets
 */
module.exports.viewTickets = async (req, res) => {
	let result;
	const user = req.session;
	try {
		result = await viewTicketsDB(user, req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function assign ticket to support
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message
 */
module.exports.AssignmentTickets = async (req, res) => {
	const user = req.session;
	try {
		const result = await AssignmentTicketsDB(user, req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function write comment for specific ticket based on ticketID
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message
 */
module.exports.writeComment = async (req, res) => {
	const user = req.session;
	try {
		if (user.role == 'Support' || user.role == 'Employee') {
			const result = await writeCommentDB(user, req.data);
			return sendResponse(res, 200, result);
		}
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function show comments for specific ticket based on ticketID
 * @async
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with comments of specific ticket
 */
module.exports.viewComment = async (req, res) => {
	const user = req.session;
	try {
		if (user.role == 'Support' || user.role == 'Employee') {
			const result = await viewCommentDB(req.data);
			return sendResponse(res, 200, result);
		}
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

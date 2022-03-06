const {
	addTickettoDB,
	viewTicketsDB,
	AssignmentTicketsDB,
	writeCommentDB,
	viewCommentDB
} = require('../models/ticket.model');
const sendResponse = require('../../../middleware/sendResponse');

module.exports.addTicket = async (req, res) => {
	const user = req.session;
	try {
		const result = await addTickettoDB(user, req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

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

module.exports.AssignmentTickets = async (req, res) => {
	const user = req.session;
	try {
		const result = await AssignmentTicketsDB(user, req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

module.exports.writeComment = async (req, res) => {
	const user = req.session;
	try {
		if (user.role == ('Support' || 'Employee')) {
			const result = await writeCommentDB(user, req.data);
			return sendResponse(res, 200, result);
		}
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

module.exports.viewComment = async (req, res) => {
	const user = req.session;
	try {
		if (user.role == ('Support' || 'Employee')) {
			const result = await viewCommentDB(req.data);
			return sendResponse(res, 200, result);
		}
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

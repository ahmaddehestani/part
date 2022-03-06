const ticketController = require('./controller/ticketController');
const dataParser = require('rest-data-parser');
const schemaValidator = require('rest-schemavalidator');
const ticketSchema = require('../../validation/ticketSchema');
const commentSchema = require('../../validation/commentSchema');
const assignTicketSchema = require('../../validation/assignTicketSchema');
const authorization = require('../../middleware/authorization');

const routes = {
	'/tickets': {
		GET: {
			function: ticketController.viewTickets,
			middlewares: [ dataParser, authorization(null) ]
		},
		POST: {
			function: ticketController.addTicket,
			middlewares: [ dataParser, authorization('Employee'), schemaValidator(ticketSchema) ]
		}
	},
	'/tickets/assign': {
		POST: {
			function: ticketController.AssignmentTickets,
			middlewares: [ dataParser, authorization('Support'), schemaValidator(assignTicketSchema) ]
		}
	},
	'/tickets/comment': {
		GET: {
			function: ticketController.viewComment,
			middlewares: [ dataParser, authorization(null) ]
		},
		POST: {
			function: ticketController.writeComment,
			middlewares: [ dataParser, authorization(null), schemaValidator(commentSchema) ]
		}
	}
};

module.exports = routes;

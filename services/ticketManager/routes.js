const ticketController = require('./controller/ticketController');
const dataparser = require('rest-data-parser');
const schemavalidator = require('rest-schemavalidator');
const ticketSchema = require('../../validation/ticketSchema');
const commentSchema = require('../../validation/commentSchema');
const assignTicketSchema = require('../../validation/assignTicketSchema');
const authorization = require('../../middleware/authorization');

const routes = {
	'/tickets': {
		GET: {
			function: ticketController.viewTickets,
			middlewares: [ dataparser, authorization(null) ]
		},
		POST: {
			function: ticketController.addTicket,
			middlewares: [ dataparser, authorization('Employee'), schemavalidator(ticketSchema) ]
		}
	},
	'/tickets/assign': {
		POST: {
			function: ticketController.AssignmentTickets,
			middlewares: [ dataparser, authorization('Support'), schemavalidator(assignTicketSchema) ]
		}
	},
	'/tickets/comment': {
		GET: {
			function: ticketController.viewComment,
			middlewares: [ dataparser, authorization(null) ]
		},
		POST: {
			function: ticketController.writeComment,
			middlewares: [ dataparser, authorization(null), schemavalidator(commentSchema) ]
		}
	}
};

module.exports = routes;

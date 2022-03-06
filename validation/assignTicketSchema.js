const ajvInstance = require('rest-ajv-custom');
const assignTicketSchema = {
	type: 'object',
	properties: {
		ticketID: { type: 'string' }
	},
	required: [ 'ticketID' ],
	additionalProperties: false
};

module.exports = ajvInstance.compile(assignTicketSchema);

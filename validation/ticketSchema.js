const ajvInstance = require('rest-ajv-custom');
const TicketSchema = {
	type: 'object',
	properties: {
		title: { type: 'string' },
		body: { type: 'string' },
		ticketID: {},
		createTime: {},
		state: { enum: [ 'Open', 'Close' ] },
		creator: {},
		assignedto: {},
		equipmentID: { type: 'string' }
	},
	required: [ 'title', 'body', 'equipmentID' ],
	additionalProperties: false
};

module.exports = ajvInstance.compile(TicketSchema);

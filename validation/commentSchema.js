const ajvInstance = require('rest-ajv-custom');
const CommentSchema = {
	type: 'object',
	properties: {
		body: { type: 'string' },
		ticketID: {},
		createTime: {},
		creator: {}
	},
	required: [ 'body', 'ticketID' ],
	additionalProperties: false
};

module.exports = ajvInstance.compile(CommentSchema);

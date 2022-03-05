const ajvInstance = require('rest-ajv-custom');
const insertUserSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		email: { type: 'string', format: 'email', uniqueItems: true },
		role: { type: 'string', enum: [ 'Admin', 'Support', 'Employee' ] },
		password: {},
		token: {}
	},
	required: [ 'name', 'email', 'password', 'role' ],
	additionalProperties: false
};

module.exports = ajvInstance.compile(insertUserSchema);

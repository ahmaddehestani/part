const ajvInstance = require('rest-ajv-custom');

const loginUserSchema = {
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email' },
		password: { type: 'string' }
	},
	required: [ 'email', 'password' ],
	additionalProperties: false
};

module.exports = ajvInstance.compile(loginUserSchema);

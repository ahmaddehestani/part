const ajvInstance = require('rest-ajv-custom');
const equipmentSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		equipmentID: {},
		email: { type: 'string' }
	},
	required: [ 'name' ]
};

module.exports = ajvInstance.compile(equipmentSchema);

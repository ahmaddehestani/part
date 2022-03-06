const ajvInstance = require('rest-ajv-custom');
const assignEquipmentSchema = {
	type: 'object',
	properties: {
		equipmentID: { type: 'string' },
		email: { type: 'string' }
	},
	required: [ 'equipmentID', 'email' ]
};

module.exports = ajvInstance.compile(assignEquipmentSchema);

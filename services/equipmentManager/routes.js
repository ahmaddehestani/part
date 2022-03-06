const equipmentController = require('./controller/equipment.controller');
const dataParser = require('rest-data-parser');
const schemaValidator = require('rest-schemavalidator');
const equipmentSchema = require('../../validation/equipmentSchema');
const assignEquipmentSchema = require('../../validation/assignEquipmentSchema');
const authorization = require('../../middleware/authorization');

const routes = {
	'/equipments': {
		POST: {
			function: equipmentController.addEquipment,
			middlewares: [ dataParser, authorization('Support'), schemaValidator(equipmentSchema) ]
		},
		GET: {
			function: equipmentController.equipmentsList,
			middlewares: [ dataParser, authorization('Support') ]
		}
	},
	'/equipments/selectOwner': {
		POST: {
			function: equipmentController.selectOwner,
			middlewares: [ dataParser, authorization('Support'), schemaValidator(assignEquipmentSchema) ]
		}
	}
};

module.exports = routes;

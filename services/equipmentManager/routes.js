const equipmentController = require('./controller/equipment.controller');
const dataparser = require('rest-data-parser');
const schemavalidator = require('rest-schemavalidator');
const equipmentSchema = require('../../validation/equipmentSchema');
const assignEquipmentSchema = require('../../validation/assignEquipmentSchema');
const authorization = require('../../middleware/authorization');

const routes = {
	'/equipments': {
		POST: {
			function: equipmentController.addEquipment,
			middlewares: [ dataparser, authorization('Support'), schemavalidator(equipmentSchema) ]
		},
		GET: {
			function: equipmentController.equipmentsList,
			middlewares: [ dataparser, authorization('Support') ]
		}
	},
	'/equipments/selectOwner': {
		POST: {
			function: equipmentController.selectOwner,
			middlewares: [ dataparser, authorization('Support'), schemavalidator(assignEquipmentSchema) ]
		}
	}
};

module.exports = routes;

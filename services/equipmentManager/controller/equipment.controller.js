const { addEquipmenttoDB, selectOwnertoDB, equipmentsListtoDB } = require('../models/equipment.model');
const sendResponse = require('../../../middleware/sendResponse');

/**
 * This function add equipment to the database
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message
 */
module.exports.addEquipment = async (req, res) => {
	const equipment = req.data;
	try {
		const result = await addEquipmenttoDB(equipment);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function assign equipment to specific employee
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object with a message
 */
module.exports.selectOwner = async (req, res) => {
	const equipment = req.data;
	try {
		const result = await selectOwnertoDB(equipment);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

/**
 * This function send list of equipments
 * @param {*} req 
 * @param {*} res 
 * @returns {object} send response containing the object of equipments list
 */
module.exports.equipmentsList = async (req, res) => {
	if (!req.data) req.data = null;
	try {
		const result = await equipmentsListtoDB(req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

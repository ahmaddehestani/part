const { addEquipmenttoDB, selectOwnertoDB, equipmentsListtoDB } = require('../models/equipment.model');
const sendResponse = require('../../../middleware/sendResponse');

module.exports.addEquipment = async (req, res) => {
	const equipment = req.data;
	try {
		const result = await addEquipmenttoDB(equipment);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

module.exports.selectOwner = async (req, res) => {
	const equipment = req.data;
	try {
		const result = await selectOwnertoDB(equipment);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

module.exports.equipmentsList = async (req, res) => {
	if (!req.data) req.data = null;
	try {
		const result = await equipmentsListtoDB(req.data);
		return sendResponse(res, 200, result);
	} catch (error) {
		return sendResponse(res, 400, error);
	}
};

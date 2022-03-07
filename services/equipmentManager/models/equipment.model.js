const executeQuery = require('../../../modules/postgresql-connector');

/**
 * This function add equipment information to database
 * @async
 * @param {object} equipment An object containing the equipment information
 * @returns {boolean} 
 * @throws {object} An object containing the message about error
 */
module.exports.addEquipmenttoDB = async (equipment) => {
	let command, params;
	let email = null;
	try {
		if (await isExistEmployee(equipment.email)) email = equipment.email;

		command = `INSERT INTO public.equipment(name,email) VALUES($1,$2);`;
		params = [ equipment.name, email ];
		await executeQuery(command, params);
		return true;
	} catch (error) {
		throw error.message;
	}
};

/**
 * This function asign equipment to specific employee
 * @async
 * @param {object} equipment An object containing the equipment information
 * @returns {boolean} 
 * @throws {object} An object containing the message about error
 */
module.exports.selectOwnertoDB = async (equipment) => {
	let command, params;
	try {
		if (await isExistEmployee(equipment.email)) {
			command = `UPDATE public.equipment SET email = $1 WHERE "EquipmentID"=$2;`;
			params = [ equipment.email, equipment.equipmentID ];
			await executeQuery(command, params);
			return true;
		}
	} catch (error) {
		throw error.message;
	}
};

/**
 * This function fetch list of equipment based on queryparameters
 * @async
 * @param {object} parameter An object containing the queryparameters
 * @returns {object} list of equipment based on queryparameters
 * @throws {object} An object containing the message about error
 */
module.exports.equipmentsListtoDB = async (parameter) => {
	try {
		const query = checkparameters(parameter);
		const { rows } = await executeQuery(query.command, query.params);
		return rows;
	} catch (error) {
		throw error.message;
	}
};

//Utils
/**
 * This function checks the existence of the user in the database
 * @async
 * @param {object} email 
 * @returns {boolean} 
 */
const isExistEmployee = async (email) => {
	command = `SELECT * FROM public.User WHERE email=$1;`;
	params = [ email ];
	const { rows } = await executeQuery(command, params);
	if (rows[0] && rows[0].role == 'Employee') {
		return true;
	} else return false;
};

/**
 * This function checks the existence of the user in the database
 * @param {object} parameter 
 * @returns {object} An object containing the parameters need for query of database
 */
const checkparameters = (parameter) => {
	let query = { command, params };
	if (!parameter) {
		query.command = `SELECT * FROM public.equipment;`;
		query.params = null;
	} else if (parameter.email) {
		query.command = `SELECT * FROM public.equipment WHERE equipment.email = $1;`;
		query.params = [ parameter.email ];
	} else if (parameter.ownership == 'false') {
		query.command = `SELECT * FROM public.equipment WHERE equipment.email IS NULL;`;
		query.params = null;
	} else if (parameter.ownership == 'true') {
		query.command = `SELECT equipment."EquipmentID" , equipment.name AS EquipmentName, "user".email , "user".name AS UserName FROM public.equipment
				   INNER JOIN public.user ON equipment.email = "user".email;`;
		query.params = null;
	}
	return query;
};

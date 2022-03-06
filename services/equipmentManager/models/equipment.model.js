const executeQuery = require('../../../modules/postgresql-connector');

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
module.exports.equipmentsListtoDB = async (parameter) => {
	let command, params;
	try {
		if (!parameter) {
			command = `SELECT * FROM public.equipment;`;
			params = null;
		} else if (parameter.ownership == 'false') {
			command = `SELECT * FROM public.equipment WHERE equipment.email IS NULL;`;
			params = null;
		} else if (parameter.ownership == 'true') {
			command = `SELECT equipment."EquipmentID" , equipment.name AS EquipmentName, "user".email , "user".name AS UserName FROM public.equipment
					   INNER JOIN public.user ON equipment.email = "user".email;`;
			params = null;
		}
		const { rows } = await executeQuery(command, params);
		return rows;
	} catch (error) {
		throw error.message;
	}
};

//Utils
const isExistEmployee = async (email) => {
	command = `SELECT * FROM public.User WHERE email=$1;`;
	params = [ email ];
	const { rows } = await executeQuery(command, params);
	if (rows[0] && rows[0].role == 'Employee') {
		return true;
	} else return false;
};

const executeQuery = require('../../../modules/postgresql-connector');

/**
 * This function insert user to database 
 * @async
 * @param {object} user An object containing the user information
 * @returns {boolean}
 * @throws {object} An object containing the message about error
 */
module.exports.insertUser = async (user) => {
	const command = `INSERT INTO public.User(name,email,role,password) VALUES($1,$2,$3,$4);`;
	const params = [ user.name, user.email, user.role, user.password ];
	try {
		await executeQuery(command, params);
		return true;
	} catch (error) {
		throw error.message;
	}
};

/**
 * This function fetch user from database based on Email
 * @async
 * @param {string} email Email of user
 * @returns {object} An object containing the requested user information
 * @throws {object} An object containing the message about error
 */
module.exports.getUser = async (email) => {
	const command = `SELECT * FROM public.User WHERE email=$1;`;
	const params = [ email ];
	try {
		const { rows } = await executeQuery(command, params);
		return rows[0];
	} catch (error) {
		throw error.message;
	}
};

/**
 * This function update user information to database
 * @async
 * @param {object} user An object containing the user information
 * @returns {boolean} 
 * @throws {object} An object containing the message about error
 */
module.exports.updateUser = async (user) => {
	const command = `UPDATE public.User SET token = $2 WHERE email=$1;`;
	const params = [ user.email, user.token ];
	try {
		await executeQuery(command, params);
		return true;
	} catch (error) {
		throw error.message;
	}
};

/**
 * This function fetch list of users based on role
 * @async
 * @param {string} role 
 * @returns {object} An object containing list of the user information
 * @throws {object} An object containing the message about error
 */
module.exports.usersList = async (role) => {
	let command, params;
	if (role) {
		command = `SELECT name,email,role FROM public.User WHERE role=$1;`;
		params = [ role ];
	} else {
		command = `SELECT name,email,role FROM public.User;`;
		params = null;
	}
	try {
		const { rows } = await executeQuery(command, params);
		return rows;
	} catch (error) {
		throw error.message;
	}
};

const executeQuery = require('../../../modules/postgresql-connector');

const insertUser = async (user) => {
	const command = `INSERT INTO public.User(name,email,role,password) VALUES($1,$2,$3,$4);`;
	const params = [user.name, user.email, user.role, user.password];
	try {
		await executeQuery(command, params);
		return true;
	} catch (error) {
		throw error.message;
	}
};

const getUser = async (email) => {
	const command = `SELECT * FROM public.User WHERE email=$1;`;
	const params = [email];
	try {
		const { rows } = await executeQuery(command, params);
		return rows[0];
	} catch (error) {
		throw error.message;
	}
};

const updateUser = async (user) => {
	const command = `UPDATE public.User SET token = $2 WHERE email=$1;`;
	const params = [user.email, user.token];
	try {
		await executeQuery(command, params);
		return true;
	} catch (error) {
		throw error.message;
	}
};

const usersList = async (role) => {
	let command, params;
	if (role) {
		command = `SELECT name,email,role FROM public.User WHERE role=$1;`;
		params = [role];
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

module.exports = {
	insertUser,
	getUser,
	usersList,
	updateUser
};

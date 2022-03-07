const executeQuery = require('../../../modules/postgresql-connector');

module.exports.addTickettoDB = async (user, req) => {
	let command, params;
	try {
		command = `SELECT * FROM public.equipment 
			 INNER JOIN public.user ON equipment.email = "user".email WHERE equipment.email=$1 AND equipment."EquipmentID" = $2 ;`;
		params = [ user.email, req.equipmentID ];
		const { rows } = await executeQuery(command, params);
		if (rows[0]) {
			let date = new Date();
			let createTime = date.getTime();
			let state = 'Open';
			command = `INSERT INTO public.ticket(title,body,"EquipmentID","createTime",state,Creator) VALUES($1,$2,$3,$4,$5,$6);`;
			params = [ req.title, req.body, req.equipmentID, createTime, state, user.email ];
			await executeQuery(command, params);
			return true;
		}
	} catch (error) {
		throw error.message;
	}
};

module.exports.viewTicketsDB = async (user, req) => {
	try {
		const query = checkparameters(user, req);
		const { rows } = await executeQuery(query.command, query.params);
		let result = filterTicket(rows, req);
		return result;
	} catch (error) {
		throw error.message;
	}
};

module.exports.AssignmentTicketsDB = async (user, req) => {
	let command, params;
	command = `SELECT * FROM public.ticket WHERE ticket.assignedto is NULL AND "TicketID"=$1 `;
	params = [ req.ticketID ];
	const { rows } = await executeQuery(command, params);
	try {
		if (rows[0]) {
			command = `UPDATE public.ticket SET assignedto = $1 WHERE "TicketID"=$2;`;
			params = [ user.email, req.ticketID ];
			await executeQuery(command, params);
			return true;
		} else return false;
	} catch (error) {
		throw error.message;
	}
};

module.exports.writeCommentDB = async (user, req) => {
	let command, params;
	state = 'Open';
	command = `SELECT * FROM public.ticket WHERE ticket.state=$1 AND ticket."TicketID"=$2 AND (ticket.creator=$3 OR ticket.assignedto=$3) `;
	params = [ state, req.ticketID, user.email ];
	const { rows } = await executeQuery(command, params);
	try {
		if (rows[0]) {
			let date = new Date();
			let createTime = date.getTime();
			command = `INSERT INTO public.comment(body,"TicketID",creator,createTime) VALUES($1,$2,$3,$4);`;
			params = [ req.body, req.ticketID, user.email, createTime ];
			await executeQuery(command, params);
			return true;
		} else return false;
	} catch (error) {
		throw error.message;
	}
};

module.exports.viewCommentDB = async (req) => {
	try {
		command = `SELECT * FROM public.comment WHERE comment."TicketID"=$1`;
		params = [ req.ticketID ];
		let { rows } = await executeQuery(command, params);
		return rows;
	} catch (error) {
		throw error.message;
	}
};

//Utils
const checkparameters = (user, req) => {
	let query = { command, params };
	if (user.role == 'Employee') {
		query.command = `SELECT * FROM public.ticket WHERE ticket.creator = $1`;
		query.params = [ user.email ];
	} else if (user.role == 'Support') {
		if (req && req.unassigned) {
			query.command = `SELECT * FROM public.ticket WHERE ticket.assignedto is NULL `;
			query.params = null;
		} else {
			query.command = `SELECT * FROM public.ticket WHERE ticket.assignedto = $1 `;
			query.params = [ user.email ];
		}
	}
	return query;
};
const filterTicket = (tickets, req) => {
	let temp = tickets;
	if (req && req.state) {
		let temp2 = filterbyState(temp, req.state);
		let result = filterbyTime(temp2, req.from, req.to);
		return result;
	} else return tickets;
};

const filterbyState = (array, state) => {
	let result = array.filter((value, index, rows) => array[index].state == state);
	return result;
};

const filterbyTime = (array, from, to) => {
	if (from && to) {
		let result = array.filter(filterbyTimeTowParam);
		return result;
	} else if (from && !to) {
		let result = array.filter(filterbyTimeOneParam);
		return result;
	} else return array;
};

const filterbyTimeTowParam = (value, index, rows) => array[index].createTime >= from && array[index].createTime <= to;
const filterbyTimeOneParam = (value, index, rows) => array[index].createTime >= from;

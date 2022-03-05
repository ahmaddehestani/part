const { Pool } = require('pg');
const configuration = {
	user: process.env.PGUSER || 'postgres',
	host: process.env.PGHOST || 'localhost',
	database: process.env.PGDATABASE || 'project',
	password: process.env.PGPASSWORD || '123qwe!@#QWE',
	port: process.env.PGPORT || 5432,
	max: 20,
	idleTimeoutMillis: 2
};

const pool = new Pool(configuration);

module.exports = (text, params, callback) => pool.query(text, params, callback);

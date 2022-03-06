const serverConfig = {
	hostname: '127.0.0.1',
	port: 3000,
	eventEmitter: null,
	event: 'NewRequest'
};

const routerConfig = {
	eventEmitter: null,
	event: 'NewRequest'
};

const servicesDirectory = './services';

const credentials = {
	user: process.env.PGUSER || 'postgres',
	host: process.env.PGHOST || 'localhost',
	database: process.env.PGDATABASE || 'postgres',
	password: process.env.PGPASSWORD || '123qwe!@#QWE',
	port: process.env.PGPORT || 5432,
	max: 20,
	idleTimeoutMillis: 2
};
const credentials2 = {
	user: process.env.PGUSER || 'postgres',
	host: process.env.PGHOST || 'localhost',
	database: process.env.PGDATABASE || 'project',
	password: process.env.PGPASSWORD || '123qwe!@#QWE',
	port: process.env.PGPORT || 5432,
	max: 20,
	idleTimeoutMillis: 2
};

module.exports = {
	serverConfig,
	routerConfig,
	servicesDirectory,
	credentials,
	credentials2
};

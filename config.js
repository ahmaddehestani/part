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

module.exports = {
	serverConfig,
	routerConfig,
	servicesDirectory
};

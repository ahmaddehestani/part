const dataParser = require('rest-data-parser');
const schemaValidator = require('rest-schemavalidator');
const userController = require('./controller/user.controller');
const insertUserSchema = require('../../validation/insertUserSchema');
const loginUserSchema = require('../../validation/loginUserSchema');
const authorization = require('../../middleware/authorization');

const routes = {
	'/users/signup': {
		POST: {
			function: userController.signup,
			middlewares: [ dataParser, authorization('Admin'), schemaValidator(insertUserSchema) ]
		}
	},
	'/users/login': {
		POST: {
			function: userController.login,
			middlewares: [ dataParser, schemaValidator(loginUserSchema) ]
		}
	},
	'/users': {
		GET: {
			function: userController.list,
			middlewares: [ dataParser, authorization(null) ]
		}
	}
};

module.exports = routes;

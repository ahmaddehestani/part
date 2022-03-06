const { Pool } = require('pg');
const { credentials2 } = require('../../config');

const pool = new Pool(credentials2);

module.exports = (text, params, callback) => pool.query(text, params, callback);

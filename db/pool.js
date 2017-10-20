'use strict';
const pg = require('pg');

const config = require('../dbConfig');

let pool = new pg.Pool(config);

pool.on('error', function(err, client) {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values) => {
  return pool.query(text, values);
};

module.exports.connect = function(callback) {
  return pool.connect(callback);
};

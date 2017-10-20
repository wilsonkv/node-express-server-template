'use strict';
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
let auth;
if (params.auth) {
  auth = params.auth.split(':');
} else {
  auth = [];
}

module.exports = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
};

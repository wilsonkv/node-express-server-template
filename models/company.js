const errorMessageHandler = require('../messages/handler/errorMessageHandler');
const query = require('../db/pool').query;

module.exports = {
  all: async () => {
    const companies = (await query('SELECT id, name FROM "companies"')).rows;
    return companies;
  },

  create: async properties => {
    const company = (await query(
      'insert into "companies" ("name") values ($1) returning *',
      [properties.name]
    )).rows[0];

    return company;
  },

  find: async id => {
    const company = (await query(
      'select * from "companies" WHERE ("id") = ($1) LIMIT 1',
      [id]
    )).rows[0];
    return company;
  },
};

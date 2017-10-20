const query = require('../db/pool').query;

//TODO: check we can use truncate cascade instead of delete
module.exports = async () => {
  await query('delete from "users"');
  await query('delete from "companies"');
};
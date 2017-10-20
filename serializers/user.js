const Company = require('../models/company');

module.exports = async user => {
  const company = await Company.find(user.companyId);
  const serialized = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    company: {
      id: company.id,
      name: company.name,
    },
  };
  return serialized;
};

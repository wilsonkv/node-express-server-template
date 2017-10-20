if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const clearDB = require('../lib/clearDB');

const Company = require('../models/company');
const User = require('../models/user');

clearDB().then(async () => {
  const company = await Company.create({ name: 'Cognizant' });

  const user = await User.create({
    firstName: 'Tom',
    lastName: 'Jerry',
    companyId: company.id,
    email: 'tom@example.com',
    password: 'password',
  });

  user.company = company;

  await process.exit();
});

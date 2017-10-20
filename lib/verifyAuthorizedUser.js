const currentUser = require('./currentUser');
const errorMessageHandler = require('../messages/handler/errorMessageHandler');

module.exports = (req, res, next, companyId) => {
  const user = currentUser(req.headers.jwt);
  if (user.company.id !== Number(companyId)) {
    let err = new Error(errorMessageHandler.getError(1012).errorMessage);
    err.status = 400; //Bad Request
    next(err);
  } else {
    next();
  }
};

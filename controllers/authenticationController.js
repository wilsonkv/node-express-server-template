const User = require('../models/user');
const errorMessageHandler = require('../messages/handler/errorMessageHandler');

exports.create = async (req, res, next) => {
  try {
    res.json(await User.authenticate(req.body));
  } catch (err) {
    console.log(err);
    res.json(errorMessageHandler.getError(1001));
  }
};

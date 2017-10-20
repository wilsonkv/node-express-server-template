const jwt = require('jsonwebtoken');


const errorMessageHandler = require('../messages/handler/errorMessageHandler');
const serializeUser = require('../serializers/user');
const User = require('../models/user');
const verifyLoggedInUser = require('../lib/verifyLoggedInUser');

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (user.error) {
      return res.json(user);
    }
    const serializedUser = await serializeUser(user);
    const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
    res.json({ jwt: token, user: serializedUser });
  } catch (err) {
    console.log(err);
    res.json(errorMessageHandler.getError(1001));
  }
};

exports.index = async (req, res, next) => {
  try {
    res.json(await User.all());
  } catch (err) {
    console.log(err);
    res.json(errorMessageHandler.getError(1001));
  }
};

exports.show = async (req, res, next) => {
  try {
    const userId = jwt.verify(req.headers.jwt, process.env.JWT_SECRET).user.id;
    const user = await User.find(userId);
    res.json(await serializeUser(user));
  } catch (err) {
    console.log(err);
    res.json(errorMessageHandler.getError(1001));
  }
};

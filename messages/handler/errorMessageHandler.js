'use strict';
const _ = require('underscore');
const messages = require('../errorMessage.json');

//TODO: Currently err code is number, seems like its better to use string constant like 
// APP_ERR instead of 10001

//Handle error messages
class errorMessageHandler {
  getError(code) {
    return _.find(messages.errorMessages, function(errorMessage) {
      return errorMessage.code == code;
    });
  }
}
module.exports = new errorMessageHandler();

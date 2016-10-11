'use strict';

const {logger} = require('./utilities/logger');
const {sendEmail} = require('./emailer');

//FooError, BarError, BizzError
const alertMiddleware = (errors) => (err, req, res, next) => {
  if ( err.stack.includes("FooError") || err.stack.includes("BarError")) {
    const data = {
      'FromEmail': 'test100mailjet@gmail.com',
      'FromName': 'test100',
      'Subject': `SERVICE ALERT: ${err.name}`,
      'Text-part': `Error occurred: ${err.message}\n\n${err.stack}`,
      'Recipients': [{'Email': process.env.TO_EMAIL}]
    };
    sendEmail(data);
  }
  next(err);
};

module.exports = {alertMiddleware};
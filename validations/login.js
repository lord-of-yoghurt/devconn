const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ email, password }) => {
  let errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email address';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email cannot be empty';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
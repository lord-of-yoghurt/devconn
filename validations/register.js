const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function valudateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  // this is from the 'confirm password' field
  data.confPassword = !isEmpty(data.confPassword) ? data.confPassword : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be empty';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  }

  if (Validator.isEmpty(data.confPassword)) {
    errors.confPassword = 'Please confirm the password';
  }

  if (!Validator.equals(data.password, data.confPassword)) {
    errors.confPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ name, email, password, confPassword }) => {
  let errors = {};

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  // this is from the 'confirm password' field
  confPassword = !isEmpty(confPassword) ? confPassword : '';

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name cannot be empty';
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Invalid email address';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email cannot be empty';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password cannot be empty';
  }

  if (Validator.isEmpty(confPassword)) {
    errors.confPassword = 'Please confirm the password';
  }

  if (!Validator.equals(password, confPassword)) {
    errors.confPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
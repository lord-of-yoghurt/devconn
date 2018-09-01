const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ text }) => {
  let errors = {};

  text = !isEmpty(text) ? text : '';

  if (!Validator.isLength(text, { min: 10, max: 1000 })) {
    errors.text = 'Post length should be between 10 and 1000 characters';
  }

  if (Validator.isEmpty(text)) {
    errors.text = 'Text cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
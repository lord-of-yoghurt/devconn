const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ title, company, from }) => {
  let errors = {};

  title = !isEmpty(title) ? title : '';
  company = !isEmpty(company) ? company : '';
  from = !isEmpty(from) ? from : '';

  if (Validator.isEmpty(title)) {
    errors.title = 'Job title is required';
  }

  if (Validator.isEmpty(company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'Please provide the start date';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
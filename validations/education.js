const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ school, degree, fieldOfStudy, from }) => {
  let errors = {};

  school = !isEmpty(school) ? school : '';
  degree = !isEmpty(degree) ? degree : '';
  fieldOfStudy = !isEmpty(fieldOfStudy) ? fieldOfStudy : '';
  from = !isEmpty(from) ? from : '';

  if (Validator.isEmpty(school)) {
    errors.school = 'School is required';
  }

  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree is required';
  }

  if (Validator.isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'Please provide the start date';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
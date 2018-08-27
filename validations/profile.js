const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {},
  { 
    handle, 
    status, 
    skills, 
    website, 
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin
  } = data,
  links = { website, youtube, twitter, facebook, instagram, linkedin };

  handle = !isEmpty(handle) ? handle : '';
  status = !isEmpty(status) ? status : '';
  skills = !isEmpty(skills) ? skills : '';

  // if (!Validator.isLength(handle), { min: 2, max: 40 }) {
  //   errors.handle = 'Handle length must be between 2 and 40 characters';
  // }

  if (Validator.isEmpty(handle)) {
    errors.handle = 'Handle is required';
  }

  if (Validator.isEmpty(status)) {
    errors.status = 'Status is required';
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = 'You do have skills, right?';
  }

  for (let link in links) {
    if (!isEmpty(links[link]) && !Validator.isURL(links[link])) {
      errors[link] = 'URL is invalid';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
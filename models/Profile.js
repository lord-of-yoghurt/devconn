const mongoose = require('mongoose'),
      { Schema } = mongoose;

// create schema
const ProfileSchema = new Schema({
  // associate with a user, since some data like
  // name and email will come from a User instance
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // SEO-friendly profile url
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: String,
  githubusername: String,
  experience: [ // array of objects
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: String,
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  education: [ 
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  social: {
    youtube: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    instagram: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
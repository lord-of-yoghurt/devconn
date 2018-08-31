const mongoose = require('mongoose'),
      { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  // this and the avatar will come from the
  // user instance
  name: String,
  avatar: String,
  // collect objectId's of users who liked a post
  // removing the like will remove the objectId
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  // array of objects - no separate Comment model
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('posts', PostSchema);
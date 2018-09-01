const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validations/post');

// @route   GET /api/posts/test
// @desc    tests post route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testPost' });
});

// @route   POST /api/posts
// @desc    receive post data and create new post
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isEmpty } = validatePostInput(req.body);

    if (!isValid) return res.status(400).json(errors);
    
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });

    newPost.save()
      .then((saved) => res.json(saved))
      .catch((e) => res.status(400).json(e));
  }
);

module.exports = router;
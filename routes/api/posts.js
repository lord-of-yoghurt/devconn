const express = require('express'),
      router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Post');

const validatePostInput = require('../../validations/post');

// @route   GET /api/posts/test
// @desc    tests post route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testPost' });
});

// @route   GET /api/posts
// @desc    return all posts
// @access  public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((e) => res.status(404).json({ error: 'No posts yet!' }));
});

// @route   GET /api/posts/:id
// @desc    find post by id and return
// @access  public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) return res.status(404).json({
        error: 'Post not found'
      });

      res.json(post);
    })
    .catch((e) => res.status(400).json({ error: 'Invalid object ID' }));
});

// @route   POST /api/posts
// @desc    receive post data and create new post
// @access  private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save()
      .then((saved) => res.json(saved))
      .catch((e) => res.status(400).json(e));
  }
);

// @route   POST /api/posts/like/:id
// @desc    like/unlike a post
// @access  private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) return res.status(404).json({
          error: 'Post not found'
        });

        const idx = post.likes.findIndex((value) => {
          return value.user == req.user.id;
        });

        // index not found - no like from this user yet
        if (idx === -1) {
          post.likes.push({ user: req.user.id });
        } else {
          post.likes.splice(idx, 1);
        }

        post.save().then((saved) => res.json(saved));
      })
      .catch((e) => res.status(400).json({ error: 'Error :(' }));
  }
);

// @route   DELETE /api/posts/:id
// @desc    find post by id delete it
// @access  private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    
    Profile.findById(req.user.id)
      .then((profile) => {
        // if (!profile) { // this doesn't work for some reason :(
        //   errors.noProfile = 'How are you even posting without a profile?..';
        //   return res.status(404).json(errors);
        // }

        Post.findById(req.params.id)
          .then((post) => {
            // Does the post belong to this user?
            if (post.user.toString() !== req.user.id) {
              errors.notYourPost = 'Users can only delete their own posts!';
              return res.status(401).json(errors);
            }

            // Delete the dam thing
            post.remove().then(() => res.json({ isDeleted: 'yas' }));
          })
          .catch((e) => {
            errors.error = 'Post not found';
            res.status(404).json(errors);
          });
      })
      .catch((e) => {
        errors.error = 'There was an error.';
        res.status(400).json(errors);
      });
  }
);

module.exports = router;
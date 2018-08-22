const express = require('express'),
      router = express.Router();

// @route   GET /api/posts/test
// @desc    tests post route
// @access  public
router.get('/test', (req, res) => {
  res.json({ test: 'testPost' });
});

module.exports = router;
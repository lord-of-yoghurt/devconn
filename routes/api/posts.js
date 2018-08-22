const express = require('express'),
      router = express.Router();

router.get('/test', (req, res) => {
  res.json({ test: 'testPost' });
});

module.exports = router;
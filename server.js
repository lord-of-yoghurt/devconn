const express = require('express'),
      mongoose = require('mongoose'),
      app = express();

const PORT = process.env.PORT || 5000;

/* DB connection */
const DB_URL = require('./config/keys').mongoURI;
mongoose.connect(DB_URL)
  .then(() => console.log('MongoDB running...'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('I AM ALIVE!!!');
});

app.listen(PORT, () => {
  console.log(`You got this! Accepting all traffic on ${PORT}...`);
});
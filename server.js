const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      app = express();

const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/posts');

/* Set up middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

/* DB connection */
const DB_URL = require('./config/keys').mongoURI;
mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB running...'))
  .catch((e) => console.log(e));

/* Use promises with Mongoose */
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.send('I AM ALIVE!!!');
});

/* Use routes */
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes); 

app.listen(PORT, () => {
  console.log(`You got this! Accepting all traffic on ${PORT}...`);
});
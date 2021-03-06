const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  });

// Middleware
app.use(express.json());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);
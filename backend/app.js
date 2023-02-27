const express = require("express"); // to import the express framework
const path = require("path"); // 
const mongoose = require("mongoose"); // to facilitate the interactions with the database
require('dotenv').config(); // to allow us to hide sensitive data
const helmet = require('helmet')
const cors = require('cors')
const nocache = require('nocache')
const hpp = require('hpp')
const rateLimiter = require('express-rate-limit')

// import our routes
const userRouter = require("./routes/user");
const { constants } = require("buffer");
const sauceRouter = require("./routes/sauces")

const Limiter = rateLimiter({
  windowMs: 15 *60 * 1000, // 15 minutes
  max: 8, // max request number
  standardHeaders: true,
  LegacyHeaders: false
})
const app = express();
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(nocache())
app.use(hpp())
// connecting to MongoDB database with security by using .env file to hide password
mongoose.connect(process.env.CONNECTION_URL)
.then(() => console.log('Connected to mongoDb'))
.catch(() => console.log('Failed to Connect to mongoDb'))

// Registering the Routers to the App
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', Limiter, userRouter);
app.use('/api/sauces', sauceRouter); 

module.exports =app;
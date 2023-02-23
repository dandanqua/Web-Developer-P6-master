const express = require("express"); // to import the express framework
const path = require("path"); // 
const mongoose = require("mongoose"); // to facilitate the interactions with the database
require('dotenv').config(); // to allow us to hide sensitive data
const cors = require('cors')

// import our routes
const userRouter = require("./routes/user");
const { constants } = require("buffer");
const sauceRouter = require("./routes/sauces")

const app = express();
app.use(cors())
// connecting to MongoDB database with security by using .env file to hide password
mongoose.connect(process.env.CONNECTION_URL)
.then(() => console.log('Connected to mongoDb'))
.catch(() => console.log('Failed to Connect to mongoDb'))

// Registering the Routers to the App
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRouter);
app.use('/api/sauces', sauceRouter); 

module.exports =app;
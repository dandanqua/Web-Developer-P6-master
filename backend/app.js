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

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

// Registering the Routers to the App
app.use('/api/auth', userRouter);
app.use('/api/sauces', sauceRouter); 
//http:localhost:3000/api/auth
/*
app.put('/api/stuff/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});




app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
*/
module.exports =app;
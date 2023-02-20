const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')
//
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "please input your email address"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a correct email address"]
  },
  password: {
    type: String,
    required: [true, "Please choose a password"]
  }
})
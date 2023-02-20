// It's a package that allows us to encrypt the password
const bcrypt = require('bcrypt');
// It's a package that allows us to create token for authentications
const jwt = require('jsonwebtoken'); 
// We get our User model, created with the mongoose schema
const User = require('../models/user')

// Post request controller for signup
exports.signup = (req, res, next) => {
  // We call the encrypt method of bcrypt and we pass it the password of the user, the salte (10) this will be the number of turns we make the algorithm do
    bcrypt.hash(req.body.password, 10)
    // We retrieve the mdp hash that we will register as a new user in the mongoDB 
        .then(hash => {
          // Creation of the new user with the mongoose model
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Register the user in the database
            user.save()
                .then(()=> res.status(201).json({ message: 'User created !'}))
                .catch(error=> res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Post request controller for login. if yes it checks its password, if it is good it returns a TOKEN containing the id of the user, otherwise it returns an error
exports.login = (req, res, next) => {
  // We must find the user in the database that corresponds to the address entered by the user
    User.findOne({ email: req.body.email })
        .then(user => {
          // If we can't find the user, we will return a 401 "unauthorized" code
            if (!user) {
                return res.status(401).json({ error: 'User not found!' });
            }
            // We use bcrypt to compare the hashes and know if they have the same original string
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                  // If false then it's not the right user, or the password is incorrect
                if (!valid) {
                    return res.status(401).json({ error: 'incorrect password !' });
                }
                // If true, we return a status of 200 and a JSON object with a userID + a token
                res.status(200).json({
                    userId: user._id,
                    // Allows you to check if the request is authenticated
                    token: jwt.sign(
                        { userId: user._id },
                        // Encoding of the userdID necessary in the event that a request would transmit a userId
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                    // We encode the userID for the creation of new objects, and this allows to apply the correct userID
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error })); 
};

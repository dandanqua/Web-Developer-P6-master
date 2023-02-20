// it's a package that allows us to create token for authentications
const jwt = require('jsonwebtoken');

// this checks the authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid User ID !';
        } else {
          next();
        }
      } catch (error) {
        res.status(401).json({ error: error | 'Invalid request !' });
    }
};
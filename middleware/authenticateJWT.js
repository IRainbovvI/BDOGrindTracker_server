const jwt = require('jsonwebtoken');
const httpStatusCodes = require('http-status-codes');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(httpStatusCodes.StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res
        .status(httpStatusCodes.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;

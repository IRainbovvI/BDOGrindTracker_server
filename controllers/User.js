const httpStatusCodes = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController {
  getAll = (req, res) => {
    User.find()
      .then((docs) => {
        return res.status(httpStatusCodes.StatusCodes.OK).json(docs);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  };

  create = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(httpStatusCodes.StatusCodes.BAD_REQUEST).json({
          message: 'User with this email already exists'
        });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ email, password: hashedPassword });
      const createdUser = await newUser.save();

      const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_KEY, {
        expiresIn: '7d'
      });

      return res.status(httpStatusCodes.StatusCodes.CREATED).json({
        user: createdUser,
        token
      });
    } catch (err) {
      console.error(err);
      return res
        .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return res
          .status(httpStatusCodes.StatusCodes.UNAUTHORIZED)
          .json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, foundUser.password);

      if (!passwordMatch) {
        return res
          .status(httpStatusCodes.StatusCodes.UNAUTHORIZED)
          .json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_KEY, {
        expiresIn: '7d'
      });

      return res
        .status(httpStatusCodes.StatusCodes.OK)
        .json({ foundUser, token });
    } catch (err) {
      console.error(err);
      return res
        .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = UserController;

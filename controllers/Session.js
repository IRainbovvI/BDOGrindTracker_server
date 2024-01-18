const session = require('../models/Session');
const httpStatusCodes = require('http-status-codes');
const mongoose = require('mongoose');

class SessionController {
  getAll = (req, res) => {
    session
      .find()
      .populate('location')
      .then((docs) => {
        return res.status(httpStatusCodes.StatusCodes.OK).send(docs);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
      });
  };

  getFiltered = (req, res) => {
    const { char_class, startDate, endDate, buffs } = req.body;
    const filter = {};

    if (char_class) {
      filter.char_class = new mongoose.Types.ObjectId(char_class);
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(
          startDate.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1T00:00:00Z')
        );
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(
          endDate.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1T23:59:59Z')
        );
      }
    }

    const filteredBuffs = buffs.filter((buff) => buff !== '');
    if (filteredBuffs.length > 0) {
      filter.buffs = { $all: filteredBuffs };
    }

    session
      .find(filter)
      .populate('location')
      .then((docs) => {
        return res.status(httpStatusCodes.StatusCodes.OK).send(docs);
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
      });
  };

  getForUser = (req, res) => {
    const { userId } = req.user;

    session
      .find({ user: userId })
      .populate({
        path: 'location',
        populate: { path: 'items' }
      })
      .then((docs) => {
        return res.status(httpStatusCodes.StatusCodes.OK).send(docs);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
      });
  };

  create = (req, res) => {
    const {
      location,
      hours,
      minutes,
      agris,
      silver_total,
      char_class,
      buffs,
      items
    } = req.body;

    const { userId: user } = req.user;

    if (
      user === undefined ||
      location === undefined ||
      hours === undefined ||
      minutes === undefined ||
      silver_total === undefined ||
      char_class === undefined ||
      items === undefined
    ) {
      return res
        .status(httpStatusCodes.StatusCodes.BAD_REQUEST)
        .send({ message: 'Invalid request data' });
    }

    const newSession = new session({
      user,
      location,
      hours,
      minutes,
      agris,
      silver_total,
      char_class,
      buffs,
      items
    });

    newSession
      .save()
      .then((savedSession) => {
        return res
          .status(httpStatusCodes.StatusCodes.CREATED)
          .send(savedSession);
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
      });
  };
}

module.exports = SessionController;

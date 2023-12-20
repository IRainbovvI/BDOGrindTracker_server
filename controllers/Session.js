const session = require('../models/Session');
const httpStatusCodes = require('http-status-codes');

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

const buff = require('../models/Buff');
const httpStatusCodes = require('http-status-codes');

class BuffController {
  getAll = (req, res) => {
    buff
      .find()
      .then((docs) => {
        return res.status(httpStatusCodes.StatusCodes.OK).send(docs);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
      });
  };
}

module.exports = BuffController;

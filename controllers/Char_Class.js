const char_class = require('../models/Char_Class');
const httpStatusCodes = require('http-status-codes');

class Char_ClassController {
  getAll = (req, res) => {
    char_class
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

module.exports = Char_ClassController;

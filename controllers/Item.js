const item = require('../models/Item');
const httpStatusCodes = require('http-status-codes');

class ItemController {
  getAll = (req, res) => {
    item
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

module.exports = ItemController;

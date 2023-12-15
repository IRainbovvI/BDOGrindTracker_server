const httpStatusCodes = require('http-status-codes');
const location = require('../models/Location');

class LocationController {
  getAll = (req, res) => {
    location
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

  getByIdWithItems = (req, res) => {
    location
      .findById(req.params.id)
      .populate('items')
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

module.exports = LocationController;

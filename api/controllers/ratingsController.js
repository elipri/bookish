const ratingsService = require("../services/ratingsService");
const ratingsController = {};

ratingsController.read = (req, res) => {
  const ratings = ratingsService.read();
  res.status(200).json({
    success: true,
    ratings: ratings,
  });
};

module.exports = ratingsController;

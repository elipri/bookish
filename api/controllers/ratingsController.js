const ratingsService = require("../services/ratingsService");
const ratingsController = {};

//GET ALL USER'S RATINGS
// GET
// Required: none
// Optional: none
// Return: ratings
ratingsController.read = async (req, res) => {
  const userId = req.user;
  const ratings = await ratingsService.read(userId);
  if (ratings) {
    res.status(200).json({
      success: true,
      ratings: ratings,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'You have no ratings! Time to rate a book.',
    });
  }
  
};

//ADD RATINGS
// POST
// Required: bookId, rating
// Optional: comment
// Return: success 201, fail 400
ratingsController.post = async (req, res) => {
  const rating = typeof(req.body.rating) === 'number' && req.body.rating < 6 && req.body.rating > 0 ? req.body.rating : false;
  const comment = typeof(req.body.comment) === 'string' && req.body.comment.trim().length > 0 ? req.body.comment : false;
  const bookId = typeof(req.body.bookId) === 'string' ? req.body.bookId : false;
  const userId = req.user;
  if (rating && bookId) {
    const bookRating = {
      rating,
      comment
    }
    const ratingGiven = await ratingsService.post(bookRating, bookId, userId);
    if (ratingGiven) {
      res.status(201).json({
        success: true
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No such book or book has already a rating!'
      });
    }
  } else {
    res.status(400).json({
      success: false
    });
  }
};

//UPDATE RATINGS
// PUT
// Required: id
// Optional: rating, comment
// Return: rating
ratingsController.update = async (req, res) => {
  const bookId = typeof req.body.bookId === "string" ? req.body.bookId : false;
  const [rating, comment] = [
    typeof req.body.rating === "number" && req.body.rating > 0 && req.body.rating < 6 
      ? req.body.rating 
      : false,
    typeof req.body.comment === "string" && req.body.comment.trim().length > 0
      ? req.body.comment
      : false
  ];
  const userId = req.user;
  if (bookId) {
    const newRating = {
      rating,
      comment
    };
    const updatedRating = await ratingsService.update(newRating, bookId, userId);
    if (updatedRating) {
      res.status(201).json({
        success: true,
        book: updatedRating
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No such book or rating found!'
      });
    }
  } else {
    res.status(400).json({
      success: false
    });
  }
};

//GET RATING BY BOOK ID?

//DELETE RATINGS
// DELETE
// Required: id (bookId)
// Optional: none
// Return: success 200, fail 400
ratingsController.delete = async (req, res) => {
  //NB! Every book has just one rating, so only bookId is needed to delete
  const bookId = typeof req.body.id === "string" ? req.body.id : false;
  const userId = req.user;
  if (bookId) {
    const delrating = await ratingsService.delete(bookId, userId);
    if (delrating) {
      res.status(200).json({
        success: true,
        message: "Rating successfully deleted!"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No ratings found!",
      });
    } 
  } else {
      res.status(400).json({
        success: false
      });
  }
};


module.exports = ratingsController;

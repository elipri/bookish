/* const quotes = [
  {
    id: 0,
    b_id: 0,
    quote: "Chance favors only the prepared mind.",
  },
  {
    id: 1,
    b_id: 0,
    quote: "Never underestimate spite as a motivator for genius.",
  },
  {
    id: 2,
    b_id: 1,
    quote:
      "Most scary stories are, of course, meant to be told. They are more scary that way. But _how_ you tell them is important.",
  },
  {
    id: 3,
    b_id: 2,
    quote:
      "It isn't often that Aunt Dahlia lets her angry passions rise, but when she does, strong men climb trees and pull them up after them.",
  },
];

const books = [
  {
    id: 0,
    title: "The Disappearing Spoon",
    author: "Sam Kean",
    year: 2020,
    month: 10,
  },
  {
    id: 1,
    title: "Scary Stories to Tell in the Dark",
    author: "Alvin Schwartz",
    year: 2020,
    month: 10,
  },
  {
    id: 2,
    title: "Right Ho, Jeeves",
    author: "P.G. Wodehouse",
    year: 2020,
    month: 9,
  },
]; */

const quotesService = require("../services/quotesService");
const quotesController = {};

//READ QUOTES
// GET
// Required: none
// Optional: none
// Return: quotes
quotesController.read = async (req, res) => {
  const userId = req.user;
  const quotes = await quotesService.read(userId);
  if (quotes) {
    res.status(200).json({
      success: true,
      quotes: quotes,
    });
  } else {
    res.status(400).json({
      success: 'Could not get any quotes. Time to add some!'
    });
  }
  
};

//ADD QUOTES
// POST
// Required: quote, bookId
// Optional: none
// Return: success 201, fail 400
quotesController.post = async (req,res) => {
  const quote = typeof(req.body.quote) === 'string' && req.body.quote.trim().length > 0 ? req.body.quote : false;
  const bookId = typeof(req.body.bookId) === 'string' ? req.body.bookId : false;
  const userId = req.user;
  if (quote && bookId) {
    const bookQuote = {
      quote
    }
    const quoteGiven = await quotesService.post(bookQuote, bookId, userId);
    if (quoteGiven) {
      res.status(201).json({
        success: true
      });
    } else {
      res.status(400).json({
        success: false
      });
    }
  } else {
    res.status(400).json({
      success: false
    });
  }
}

//UPDATE QUOTES
// PUT
// Required: bookId, quoteId, quote
// Optional: none
// Return: quote data
quotesController.update = async (req, res) => {
  const bookId = typeof req.body.bookId === "string" ? req.body.bookId : false;
  const quoteId = typeof req.body.quoteId === "string" ? req.body.quoteId : false;
  const quote = typeof req.body.quote === "string" && req.body.quote.trim().length > 0 ? req.body.quote : false;
  const userId = req.user;
  if (bookId && quoteId && quote) {
    const newQuote = {
      quote
    };
    const updatedQuote = await quotesService.update(newQuote, bookId, quoteId, userId);
    if (updatedQuote) {
      res.status(201).json({
        success: true,
        updatedQuote
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'No such quote or book found!'
      });
    }
  } else {
    res.status(400).json({
      success: false
    });
  }
};

//DELETE QUOTES
// DELETE
// Required: bookId, quoteId
// Optional: none
// Return: success 200, fail 400
quotesController.delete = async (req,res) => {
  const bookId = typeof req.body.bookId === "string" ? req.body.bookId : false;
  const quoteId = typeof req.body.quoteId === "string" ? req.body.quoteId : false;
  const userId = req.user;
  if (bookId && quoteId) {
    console.log(bookId, quoteId, userId);
    const delquote = await quotesService.delete(bookId, quoteId, userId);
    if (delquote) {
      res.status(200).json({
        success: true,
        message: "Quote successfully deleted!"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such books or quotes found!",
      });
    } 
  } else {
      res.status(400).json({
        success: false
      });
  }
}

module.exports = quotesController;

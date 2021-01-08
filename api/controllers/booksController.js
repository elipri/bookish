//@ts-check
const booksService = require("../services/booksService");
const booksController = {};

//GET BOOKS
// GET
// Required: none
// Optional: none
// Return: user's books
booksController.read = async (req, res) => {
  const userId = req.user;
  const books = await booksService.read(userId);
  if (books) {
    res.status(200).json({
      success: true,
      books: books,
    });
  } else {
    res.status(400).json({
      success: true,
      books: books,
    });
  }
};

//GET BOOK BY ID
// GET
// Required: id
// Optional: none
// Return: book
booksController.readid = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user;
  const book = await booksService.readById(bookId, userId);
  if (book) {
    res.status(200).json({
      success: true,
      book,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'No such book found'
  });
  }
  
};

//DELETE A BOOK
// DELETE
// Required: id
// Optional: none
// Return: success 200, fail 400
booksController.delete = async (req, res) => {
  const bookId = typeof req.body.id === "string" ? req.body.id : false;
  const userId = req.user;
  if (bookId) {
    const delbook = await booksService.delete(bookId, userId);
    if (delbook) {
      res.status(200).json({
        success: true,
        message: "Book successfully deleted!"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such book found!",
      });
    }
    
  } else {
    res.status(400).json({
      success: false,
      message: "Required field(s) missing!",
    });
  }
};

//ADD A NEW BOOK
// POST
// Required: title, author
// Optional: none
// Return: book data
booksController.post = async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const userId = req.user;
  if (title && author) {
    const book = {
      title: title,
      author: author
    };
    const newBook = await booksService.create(book, userId);
    if (newBook) {
      res.status(201).json({
        success: true,
        book: newBook
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Book could not be added",
      });
    }
    
  } else {
    res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }
};

//UPDATE A BOOK
// PUT
// Required: id
// Optional: title, author
// Return: book data
booksController.put = async (req, res) => {
  const id = typeof req.body.id === "string" ? req.body.id : false;
  const [title, author] = [
    typeof req.body.title === "string" && req.body.title.trim().length > 0
      ? req.body.title
      : false,
    typeof req.body.author === "string" && req.body.author.trim().length > 0
      ? req.body.author
      : false
  ];
  const userId = req.user;
  if (id) {
    const book = {
      id,
      title,
      author
    };
    const updatedBook = await booksService.update(book, userId);
    if (updatedBook) {
      res.status(200).json({
        success: true,
        updatedBook
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Such book does not exists.'
    });
    }
    
  } else {
    res.status(400).json({
      success: false,
      message: "Required fields missing/invalid",
    });
  }
};

module.exports = booksController;
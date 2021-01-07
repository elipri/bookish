//@ts-check
const booksService = require("../services/booksService");
const booksController = {};

//GET BOOKS
booksController.read = async (req, res) => {
  const userId = req.user;
  const books = await booksService.read(userId);
  res.status(200).json({
    success: true,
    books: books,
  });
};

//GET BOOK BY ID
booksController.readid = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user;
  const book = await booksService.readById(bookId, userId);
  if (book) {
    res.status(200).json({
      success: true,
      //books: books[req.params.id]['title']
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
booksController.delete = async (req, res) => {
  //const books = booksService.read();
  //console.log(req.body.id);
  const bookId = typeof req.body.id === "string" ? req.body.id : false;
  const userId = req.user;
  if (bookId) {
    const delbook = await booksService.delete(bookId, userId);
    //books.splice(id, 1);
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
booksController.post = async (req, res) => {
  //const books = booksService.read();
  //console.log(req.body);
  /* const [title, author, userId] = [
    typeof(req.body.title) === 'string' && req.body.title.trim().length > 0 ? req.body.title : false,
    typeof(req.body.author) === 'string' && req.body.author.trim().length > 0 ? req.body.author : false,
    req.user
    /* req.body.year,
    req.body.month, 
    req.body.userId 
  ]; */
  const title = req.body.title;
  const author = req.body.author;
  //const userId = 'cVToTSqZEFaDyPezvdqf';
  const userId = req.user;
  console.log(title);
  console.log(author);
  console.log(userId);
  if (title && author) {
    //const title = req.body.title;

    //console.log(title);
    const book = {
      title: title,
      author: author
    };

    const newBook = await booksService.create(book, userId);
    //books.push(newBook);
    console.log(newBook);
    res.status(201).json({
      success: true,
      book: newBook/* ,
      book: title,
      books: books */
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }
};

//UPDATE A BOOK
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
      res.status(201).json({
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

  /* if(id || id === 0) {
        title ? books[id].title = title : false;
        author ? books[id].author = author : false;
        year ? books[id].year = year : false;
        month ? books[id].month = month : false;
        res.status(400).json({
            success : true,
            message: books[id]
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required fields missing/invalid'
        });
    } */
};

module.exports = booksController;
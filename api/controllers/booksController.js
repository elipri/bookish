//@ts-check
const booksService = require("../services/booksService");

const booksController = {};

//ok
booksController.read = (req, res) => {
  const books = booksService.read();
  res.status(200).json({
    success: true,
    books: books,
  });
};

//ok
booksController.readid = (req, res) => {
  const bookId = req.params.id;
  const book = booksService.readById(bookId);
  //console.log(books[req.params.id]);
  res.status(200).json({
    success: true,
    //books: books[req.params.id]['title']
    books: book["title"],
  });
};

//ok
booksController.delete = (req, res) => {
  //const books = booksService.read();
  //console.log(req.body.id);
  const id = typeof req.body.id === "number" ? req.body.id : false;
  if (id || id === 0) {
    const books = booksService.delete(id);
    //books.splice(id, 1);
    res.status(200).json({
      success: true,
      message: "Book successfully deleted!",
      books: books,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

//ok
booksController.post = (req, res) => {
  const books = booksService.read();
  //console.log(req.body);
  const [title, author, year, month, userId] = [
    req.body.title,
    req.body.author,
    req.body.year,
    req.body.month,
    req.body.userId
  ];
  if (title && author && year && month && userId) {
    //const title = req.body.title;

    //console.log(title);
    const book = {
      id: books.length,
      title: title,
      author: author,
      year: year,
      month: month,
      userId: userId
    };
    const newBook = booksService.create(book);
    //books.push(newBook);
    console.log(newBook);
    res.status(201).json({
      success: true,
      book: title,
      books: books
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }
};

//ok
booksController.put = (req, res) => {
  const id = typeof req.body.id === "number" ? req.body.id : false;
  if (id || id === 0) {
    const [title, author, year, month] = [
      typeof req.body.title === "string" && req.body.title.trim().length > 0
        ? req.body.title
        : false,
      typeof req.body.author === "string" && req.body.author.trim().length > 0
        ? req.body.author
        : false,
      typeof req.body.year === "number" ? req.body.year : false,
      typeof req.body.month === "number" ? req.body.month : false,
    ];

    const book = {
      id,
      title,
      author,
      year,
      month
    };
    const updatedBook = booksService.update(book);
    res.status(400).json({
      success: true,
      message: updatedBook,
    });
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
/* const books = [
    {
      id: 0,
      title: "The Disappearing Spoon",
      author: "Sam Kean",
      year: 2020,
      month: 10
    },
    {
      id: 1,
      title: "Scary Stories to Tell in the Dark",
      author: "Alvin Schwartz",
      year: 2020,
      month: 10
    },
    {
      id: 2,
      title: "Right Ho, Jeeves",
      author: "P.G. Wodehouse",
      year: 2020,
      month: 9
    },
  ]; */
const booksService = require("../services/booksService");

const booksController = {};

booksController.read = (req, res) => {
  const books = booksService.read();
  res.status(200).json({
    success: true,
    books: books,
  });
};

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

booksController.post = (req, res) => {
  const books = booksService.read();
  //console.log(req.body);
  const [title, author, year, month] = [
    req.body.title,
    req.body.author,
    req.body.year,
    req.body.month,
  ];
  if (title && author && year && month) {
    //const title = req.body.title;

    //console.log(title);
    const book = {
      id: books.length,
      title: title,
      author: author,
      year: year,
      month: month,
    };
    const newBook = booksService.create(book);
    //books.push(newBook);
    console.log(newBook);
    res.status(201).json({
      success: true,
      book: title,
      books: books,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }
};

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
      month,
    };
    const updatedBook = booksService.update(book);
    res.status(400).json({
        success : true,
        message: updatedBook
    });
  } else {
    res.status(400).json({
        success: false,
        message: 'Required fields missing/invalid'
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

//mida vaja teha? kirjutada, kustutada, pärida, muuta

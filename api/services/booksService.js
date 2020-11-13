const books = [
  {
    id: 0,
    title: "The Disappearing Spoon",
    author: "Sam Kean",
    year: 2020,
    month: 10,
    userId: 0
  },
  {
    id: 1,
    title: "Scary Stories to Tell in the Dark",
    author: "Alvin Schwartz",
    year: 2020,
    month: 10,
    userId: 0
  },
  {
    id: 2,
    title: "Right Ho, Jeeves",
    author: "P.G. Wodehouse",
    year: 2020,
    month: 9,
    userId: 0
  },
];

booksService = {};

booksService.read = () => {
  return books;
};

booksService.readById = bookId => {
  return books[bookId];
};

booksService.create = book => {
  book.id = books.length;
  books.push(book);
  const bookToReturn = { ...book };
  return bookToReturn;
};

booksService.update = book => {
  book.title ? (books[book.id].title = book.title) : false;
  book.author ? (books[book.id].author = book.author) : false;
  book.year ? (books[book.id].year = book.year) : false;
  book.month ? (books[book.id].month = book.month) : false;
  const updatedBook = { ...books[book.id] };
  return updatedBook;
};

booksService.delete = id => {
  books.splice(id, 1);
  return books;
};

module.exports = booksService;

const { doc } = require("../../db");
const db = require("../../db");

/* const books = [
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
]; */

booksService = {};

//GET USER'S BOOKS
booksService.read = async (userId) => {
  const snapshot =  await db.collection('users').doc(userId).collection('books').get();
  const books = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return books;
};

//GET BOOK BY ID
booksService.readById = async (bookId, userId) => {
  const doc = await db.collection('users').doc(userId).collection('books').doc(bookId).get();
  if (!doc.exists) {
    return false;
  }
  const book = doc.data();
  return book;
};

//ADD A NEW BOOK
booksService.create = async (book, userId) => {
  const doc = await db.collection('users').doc(userId).collection('books').add(book);
  return doc.id;
};

//UPDATE A BOOK
booksService.update = async (book, userId) => {
  const updatedBook = {};
  book.title ? (updatedBook.title = book.title) : false;
  book.author ? (updatedBook.author = book.author) : false;
  const doc =  await db.collection('users').doc(userId).collection('books').doc(book.id).get();
  if (!doc.exists) {
    return false;
  }
  await db.collection('users').doc(userId).collection('books').doc(book.id).update(updatedBook);
  return updatedBook;
};

//DELETE A BOOK
booksService.delete = async (bookId, userId) => {
  const doc = await db.collection('users').doc(userId).collection('books').doc(bookId).get();
  if (!doc.exists) {
    return false;
  }
  await db.collection('users').doc(userId).collection('books').doc(bookId).delete();
  return true;
};

module.exports = booksService;

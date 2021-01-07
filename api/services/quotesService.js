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
  ]; */

  const { doc } = require("../../db");
  const db = require('../../db');
  quotesService = {};

  //GET ALL QUOTES
  quotesService.read = async userId => {
    const snapshot = await db.collection('users').doc(userId).collection('books').get();
    const books = [];
    const bookQuotes = [];
    for(const doc of snapshot.docs) {
      books.push({
        id: doc.id,
        title: doc.data().title,
        ...doc.data()
      });
    }
    for (const book of books) {
      const snap = await db.collection('users').doc(userId).collection('books').doc(book.id).collection('quotes').get();
      for (const doc of snap.docs) {
        bookQuotes.push({
          id: doc.id,
          book: book.title,
          ...doc.data()
        });
      }
    }
    if (bookQuotes.length < 1) {
      return false;
    }
    return bookQuotes;
  };

  //ADD A QUOTE
  quotesService.post = async (quote, bookId, userId) => {
    //console.log('this runs');
    if(!quote, !bookId, !userId) return false;
    const doc =  await db.collection('users').doc(userId).collection('books').doc(bookId).collection('quotes').add(quote);
    return doc.id;
  };

  //UPDATE QUOTE
  quotesService.update = async (quote, bookId, quoteId, userId) => {
    const updatedQuote = {};
    quote ? (updatedQuote.quote = quote.quote) : false;
    console.log(updatedQuote);
    const update = await db.collection('users').doc(userId).collection('books').doc(bookId).collection('quotes').doc(quoteId).update(quote);
    if (update) {
      return updatedQuote.quote;
    } else {
      return false;
    }
  }

  //DELETE QUOTE
  quotesService.delete = async(bookId, quoteId, userId) => {
    console.log('this runs');
    const doc = await db.collection('users').doc(userId).collection('books').doc(bookId).collection('quotes').doc(quoteId).get();
    console.log(doc);
    if (!doc.exists) {
      return false;
    }
    await db.collection('users').doc(userId).collection('books').doc(bookId).collection('quotes').doc(quoteId).delete();
    return true;
  };
 

  module.exports = quotesService;
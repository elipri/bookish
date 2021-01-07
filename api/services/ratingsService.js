/* const ratings = [
    {
      id: 0,
      b_id: 0,
      rating: 7,
    },
    {
      id: 1,
      b_id: 1,
      rating: 6,
    },
    {
      id: 2,
      b_id: 2,
      rating: 8,
    },
  ]; */

  const { doc } = require("../../db");
  const db = require('../../db');
  ratingsService = {};

  //GET BOOK RATINGS
  ratingsService.read = async userId => {
    const snapshot = await db.collection('users').doc(userId).collection('books').get();
    const books = [];
    const bookRatings = [];
    for(const doc of snapshot.docs) {
      books.push({
        id: doc.id,
        title: doc.data().title,
        ...doc.data()
      });
    }
    for (const book of books) {
      const snap = await db.collection('users').doc(userId).collection('books').doc(book.id).collection('ratings').get();
      for (const doc of snap.docs) {
        bookRatings.push({
          // id: doc.id,
          title: book.title,
          ...doc.data()
        });
      }
    }
    if (bookRatings.length < 1) {
      return false;
    }
    return bookRatings;
  };

  //GET BOOK RATING BY BOOK ID?

  //ADD BOOK RATINGS
  ratingsService.post = async (rating, bookId, userId) => {
    if(!rating, !bookId, !userId) return false;
    //NB! CHECK IF RATING ALREADY EXISTS & RETURN FALSE IF IT DOES!
    const snap = await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').get();
    if(!snap.empty) {
      console.log(!snap.empty);
      return false;
    }
    const doc =  await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').add(rating);
    return doc.id;
  };


  //UPDATE BOOK RATINGS
  ratingsService.update = async (rating, bookId, userId) => {
    const updatedRating = {};
    rating.rating ? (updatedRating.rating = rating.rating) : false;
    rating.comment ? (updatedRating.comment = rating.comment) : false;
    console.log(bookId, userId);
    const snap = await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').get();
    const rs = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    ratingId = rs[0].id;
    await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').doc(ratingId).update(updatedRating);
    return updatedRating;
  }

  //DELETE BOOK RATINGS
  ratingsService.delete =  async (bookId, userId) => {
    const doc = await db.collection('users').doc(userId).collection('books').doc(bookId).get();
    if (!doc.exists) {
      return false;
    }
    const snap = await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').get();
    if (snap.empty) {
      return false;
    }
    const rs = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    ratingId = rs[0].id;
    await db.collection('users').doc(userId).collection('books').doc(bookId).collection('ratings').doc(ratingId).delete();
    return true;
  }
  

  module.exports = ratingsService;
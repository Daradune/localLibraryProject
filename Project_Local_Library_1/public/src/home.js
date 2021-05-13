//const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let acc = 0;
  for (let bookCounter in books){
    if (books[bookCounter].borrows[0].returned === false){
      acc ++;
    }
  }
  return acc;
}

function getMostCommonGenres(books) {
  let booksByGenre = [];
  for (let bookSorter of books){
    let genre = booksByGenre.find((genreCheck) => genreCheck.name === bookSorter.genre);
    if (genre){
      genre.count ++;
    }else{
      booksByGenre.push({name:bookSorter.genre, count:1});
    }
  }
  booksByGenre.sort((genre1,genre2) => genre2.count - genre1.count);
  return booksByGenre.slice(0,5);
}

function getMostPopularBooks(books) {
  const mostPopular = [];
  for(let bookCheck in books){
    let individualBookCount = books[bookCheck].borrows.length;
    mostPopular.push({name : books[bookCheck].title, count : individualBookCount});
  }
  let mostPopularSorted = mostPopular.sort((bookA,bookB)=> bookA.count < bookB.count ? 1 : -1);
  return mostPopularSorted.slice(0,5);
}

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function getMostPopularAuthors(books, authors) {
 const mappedBooks = books.map((book) => {
   const {name : {first, last}} = findAuthorById(authors, book.authorId)
   return { name: `${first} ${last}`, count: book.borrows.length };
 });
 return mappedBooks.sort((book1, book2) => book2.count - book1.count).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

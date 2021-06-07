//const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  console.log(books[0].borrows[0].returned)
  let result = books.filter((bookCheck) => bookCheck.borrows[0].returned === false)
  return result.length;
}

function _sortByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyA] > obj[keyB]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sorted = _sortByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
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

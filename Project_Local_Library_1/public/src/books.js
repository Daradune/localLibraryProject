const { getBooksBorrowedCount } = require("./home");

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let booksIn = [];
  let booksOut = [];
  for(let bookChecker in books){
    if (books[bookChecker].borrows[0].returned === false){
      booksOut.push(books[bookChecker])
    }else{
      booksIn.push(books[bookChecker])
    }
  }
  result.push(booksOut, booksIn)
  return result
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book
  let result = [];
  for(let selected in borrows){
    for(let account in accounts){
      if (borrows[selected].id === accounts[account].id){
        result.push({...borrows[selected],...accounts[account]})
      }
    }
  }
  return result.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  result = accounts.map((account) => account);
  result.sort((account1, account2) => (account1.name.last > account2.name.last ? 1 : -1));
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for(let bookCheck in books){
    let found = books[bookCheck].borrows.find((borrow) => borrow.id === account.id);
    if (found){
      result ++
    }
  }
  return result
}
function getBooksPossessedByAccount(account, books, authors) {
  //find what books are checked out to the account
  result = [];
  for(let bookCheck in books){
    if(books[bookCheck].borrows[0].id === account.id){
      if(books[bookCheck].borrows[0].returned === false){
        let bookResult = books[bookCheck]
        //the author for the book in to the book object
        for(let authorCheck in authors){
          if(authors[authorCheck].id === bookResult.authorId){
            bookResult.author = authors[authorCheck]
            result.push(bookResult);
          }
        }
      }
    }
  }
  //return an array with all the books in it
  return result;
}
//console.log(account.id)
    //console.log(books[bookCheck].borrows[0].id);
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};


const sqlite3 = require('sqlite3').verbose()
const {open} = require('sqlite')


async function insertBook(title, author, rating){
    let sql = `
    INSERT INTO BOOKS(TITLE, AUTHOR, RATING)
    VALUES(?, ?, ?)
    `
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    db.run(sql, [title, author, rating])
}

async function returnAllBooks(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT * FROM BOOKS
    `;

    const books = await db.all(sql)
    db.close()
    return books
}

// returnAllBooks().then((books) => books.forEach((book) => console.log(book['TITLE'])))

module.exports = {insertBook, returnAllBooks}
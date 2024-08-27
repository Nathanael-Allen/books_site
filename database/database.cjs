
const sqlite3 = require('sqlite3').verbose()
const {open} = require('sqlite')


async function insertBook(title, author, rating){
    let sql = `
    INSERT INTO BOOKS(TITLE, AUTHOR, RATING)
    VALUES(?, ?, ?)
    `
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    db.run(sql, [title, author, rating])
    db.close()
}

async function returnFinishedBooks(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT * FROM BOOKS
    WHERE FINISHED = 1;
    `;

    const books = await db.all(sql)
    db.close()
    return books
}

async function returnUnfinishedBooks(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT TITLE, AUTHOR FROM BOOKS
    WHERE FINISHED = 0;
    `;

    const books = await db.all(sql)
    db.close()
    return books
}


module.exports = {insertBook, returnFinishedBooks, returnUnfinishedBooks}

const sqlite3 = require('sqlite3').verbose()
const {open} = require('sqlite')


async function insertUnreadBook(title, author){
    let sql = `
    INSERT INTO BOOKS(TITLE, AUTHOR, FINISHED)
    VALUES(?, ?, 0)
    `
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    db.run(sql, [title, author])
    db.close()
}

async function insertFinishedBook(title, author, rating, review){
    let sql = `
    INSERT INTO BOOKS(TITLE, AUTHOR, RATING, REVIEW, FINISHED)
    VALUES(?, ?, ?, ?, 1)
    `
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    db.run(sql, [title, author, rating, review])
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

async function validUser(username, pass){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT USERNAME, PASSWORD 
    FROM USERS 
    WHERE USERNAME = ? AND PASSWORD = ?;
    `

    const user = db.get(sql, username, pass);
    db.close();
    return user;
}


async function searchDB(search){
    if(!search){
        return
    }
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
        SELECT *
        FROM BOOKS
        WHERE TITLE LIKE ? OR AUTHOR LIKE ? AND FINISHED = 1
        LIMIT 10;
    `;

    let results = await db.all(sql, `%${search}%`, `%${search}%`);
    db.close();
    return results;
}




module.exports = {
    insertUnreadBook,
    insertFinishedBook,
    returnFinishedBooks,
    returnUnfinishedBooks,
    validUser,
    searchDB
    }
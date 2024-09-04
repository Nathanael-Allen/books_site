
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

async function getAllReviews(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT * FROM BOOKS
    WHERE FINISHED = 1;
    `;

    const books = await db.all(sql)
    db.close()
    return books
};

async function getReadingList(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT BOOKID, TITLE, AUTHOR FROM BOOKS
    WHERE FINISHED = 0;
    `;

    const books = await db.all(sql)
    db.close()
    return books
};

async function getBook(id){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql  = `
        SELECT * FROM BOOKS
        WHERE BOOKID = ?;
    `;

    const book = await db.get(sql, id);
    db.close()
    return book
};

async function validUser(username, pass){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT USERNAME, PASSWORD 
    FROM USERS 
    WHERE USERNAME = ? AND PASSWORD = ?;
    `;
    const user = db.get(sql, username, pass);
    db.close();
    return user;
};


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
};




module.exports = {
    getAllReviews,
    getReadingList,
    validUser,
    searchDB,
    getBook
    };
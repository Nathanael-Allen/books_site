
const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

// Reviews functions
async function getAllReviews(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT * FROM reviews;
    `;
    
    const books = await db.all(sql)
    db.close()
    return books
};

async function getOneBook(id){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql  = `
    SELECT * FROM BOOKS
    WHERE BOOKID = ?;
    `;
    
    const book = await db.get(sql, id);
    db.close()
    return book
};

async function searchReviews(search){
    if(!search){
        return
    }
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
        SELECT * FROM reviews
        WHERE title LIKE ? OR author LIKE ?
        LIMIT 10;
    `;

    let results = await db.all(sql, `%${search}%`, `%${search}%`);
    db.close();
    return results;
};

// Reading list functions
async function getReadingList(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT book_id, title, author, date_added FROM reading_list;
    `;

    const books = await db.all(sql)
    db.close()
    return books
};

module.exports = {
    getAllReviews,
    getReadingList,
    searchReviews,
    getOneBook
    };
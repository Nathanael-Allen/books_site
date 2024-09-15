const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

async function getGoogleBooks(bookTitle){
    try{
        const baseURL = new URL('https://www.googleapis.com');
        const search = bookTitle.replace(' ', '+');
        baseURL.pathname = '/books/v1/volumes';
        baseURL.searchParams.set('q', search);
        baseURL.searchParams.set('fields', 'items(volumeInfo(title,authors,imageLinks))');
        baseURL.searchParams.set('key', process.env.API_KEY);

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(baseURL.href, {
            method: 'GET',
            headers: headers,
        });

        const cover = await response.json();
        return cover.items.slice(0, 11);
    }
    catch(err){
        console.log(err)
    }
};

// Reviews functions
async function getAllReviews(){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT reviews.review_id, reviews.title, reviews.author, reviews.rating, reviews.review, reviews.userID, reviews.imageSrc, users.username
    FROM reviews
    JOIN users ON reviews.userID = users.userID
    ORDER BY review_id DESC
    LIMIT 10;
    `;
    
    const books = await db.all(sql)
    db.close()
    return books
};

async function getUserReviews(userID){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database})
    let sql = `
    SELECT * FROM reviews
    WHERE userID = ?
    ORDER BY review_id DESC
    LIMIT 10;
    `;
    
    const books = await db.all(sql, userID)
    db.close()
    return books
}

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
async function getImageSrc(id){
    try{
        const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        SELECT imageSrc FROM reading_list
        WHERE book_id = ?;
        `;
        let imageSrc = db.get(sql, id);
        db.close();
        return imageSrc;
    }
    catch(err){
        console.log(err);
    }
}

async function addToReadingList(book, userID){
    try{
        const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        INSERT INTO reading_list(title, author, userID, imageSrc)
        VALUES(?, ?, ?, ?);
        `
        db.run(sql, book.title, book.author, userID, book.imageSrc);
        db.close();
    }
    catch(err){
        console.log(err)
    }
}

async function getReadingList(userID){
    const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT book_id, title, author 
    FROM reading_list
    WHERE userID = ?
    ORDER BY book_id DESC;
    `;

    const books = await db.all(sql, userID);
    db.close();
    return books
};

async function addReview(book, userID){
    try{
        const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        INSERT INTO reviews(title, author, rating, review, imageSrc, userID) 
        VALUES(?, ?, ?, ?, ?, ?);
        `;
        await db.run(sql, book.title, book.author, book.rating, book.review, book.imageSrc, userID);

        if(book.book_id){
            let listSql = `
            DELETE FROM reading_list WHERE book_id = ?;
            `
            db.run(listSql, book.book_id)
        };
        db.close();
    }
    catch(err){
        console.log(err)
    }
};

async function deleteReview(reviewID){
    try{
        const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        DELETE FROM reviews WHERE review_id = ?;
        `
        await db.run(sql, reviewID);
        db.close();
    }
    catch(err){
        console.log(err)
    }
}

async function deleteFromReadingList(bookID){
    try{
        const  db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        DELETE FROM reading_list WHERE book_id = ?;
        `
        await db.run(sql, bookID);
        db.close();
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    deleteFromReadingList,
    deleteReview,
    getUserReviews,
    getGoogleBooks,
    getAllReviews,
    getReadingList,
    searchReviews,
    addReview,
    getOneBook,
    getImageSrc,
    addToReadingList
    };
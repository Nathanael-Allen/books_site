const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');

async function getUserReviews(user_id){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT title, author, rating, review 
    FROM reviews
    INNER JOIN users
    ON reviews.user_id = users.user_id
    WHERE user_id = ?;
    `;

    const reviews = db.all(sql, user_id);
    db.close();
    return reviews;
};

async function getUserReadingList(user_id){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT title, author
    FROM reading_list
    INNER JOIN users
    ON reviews.user_id = users.user_id
    WHERE user_id = ?;
    `;

    const reading_list = db.all(sql, user_id);
    db.close();
    return reading_list;
};

async function getUserLogin(username, pass){
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

export {
    getUserReviews,
    getUserReadingList,
    getUserLogin
}
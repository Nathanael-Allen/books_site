const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');


async function getUserReviews(user_id){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT * FROM reviews
    WHERE user_id = ?;
    `;

    const reviews = db.all(sql, user_id);
    db.close();
    return reviews;
};

async function getUserReadingList(user_id){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT * FROM reading_list
    WHERE user_id = ?;
    `;

    const reading_list = db.all(sql, user_id);
    db.close();
    return reading_list;
};


async function getUserLogin(username, pass){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    SELECT username, password
    FROM users 
    WHERE username = ? AND password = ?;
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
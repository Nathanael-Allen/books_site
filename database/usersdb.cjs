const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');
const bcrypt = require('bcrypt');


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

async function addUser(username, pass){
    const hash = bcrypt.hashSync(pass, 10);
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql = `
    INSERT INTO reviews(username, password)
    VALUES(?, ?)
    `;
    db.exec(sql, username, hash);
    db.close();
}

export {
    getUserReviews,
    getUserReadingList,
    getUserLogin,
    addUser
}
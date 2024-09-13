const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');
const bcrypt = require('bcrypt');


async function getUserReviews(userID){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT * FROM reviews
    WHERE userID = ?;
    `;

    const reviews = db.all(sql, userID);
    db.close();
    return reviews;
};

async function getUserReadingList(userID){
    const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
    let sql =`
    SELECT * FROM reading_list
    WHERE userID = ?;
    `;

    const reading_list = db.all(sql, userID);
    db.close();
    return reading_list;
};


async function validateUser(username, pass){
    try{
        const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
        let sql = `
        SELECT userID, username, password
        FROM users 
        WHERE username = ?;
        `;
        const user = await db.get(sql, username);
        if(user){
            let valid = await bcrypt.compare(pass, user.password)
            if(valid){
                db.close();
                return user;
            }
            else{
                db.close();
                return false;
            }   

        }
        else{
            db.close()
            return false;
        }  
    }
    catch(err){
        console.log(err)
    }

};

async function addUser(username, pass){
    try{
        if(username && pass){
            const hash = bcrypt.hashSync(pass, 10);
            const db = await open({filename: 'private/books.db', driver: sqlite3.Database});
            let sql = `
            INSERT INTO users(username, password)
            VALUES(?, ?)
            `;
            await db.run(sql, username, hash);
            db.close();
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {
    getUserReviews,
    getUserReadingList,
    validateUser,
    addUser
}
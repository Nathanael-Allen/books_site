const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const bcrypt = require("bcrypt");

const dbPath = process.env.DB_PATH

async function getUserReviews(userID) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  let sql = `
    SELECT * FROM reviews
    WHERE userID = ?;
    `;

  const reviews = db.all(sql, userID);
  db.close();
  return reviews;
}

async function getUserReadingList(userID) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  let sql = `
    SELECT * FROM reading_list
    WHERE userID = ?;
    `;

  const reading_list = db.all(sql, userID);
  db.close();
  return reading_list;
}

async function validateUser(username, pass) {
  const fixedUsername = username.trim().toLowerCase();
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    let sql = `
        SELECT userID, username, password
        FROM users 
        WHERE username = ?;
        `;
    const user = await db.get(sql, fixedUsername);
    if (user) {
      let valid = await bcrypt.compare(pass, user.password);
      if (valid) {
        db.close();
        return user;
      } else {
        db.close();
        return false;
      }
    } else {
      db.close();
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addUser(username, pass) {
  const fixedUsername = username.trim().toLowerCase();
  try {
    if (fixedUsername && pass) {
      const hash = bcrypt.hashSync(pass, 10);
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      let sql = `
            INSERT INTO users(username, password)
            VALUES(?, ?)
            `;
      await db.run(sql, fixedUsername, hash);
      db.close();
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function checkUsername(username) {
  const fixedUsername = username.trim().toLowerCase();
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  let sql = `
    SELECT username FROM users
    WHERE username = ?;
    `;

  const exists = await db.get(sql, fixedUsername);
  db.close();
  if (exists) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getUserReviews,
  getUserReadingList,
  validateUser,
  addUser,
  checkUsername
};

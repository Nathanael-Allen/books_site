CREATE TABLE reviews(
    review_id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT,
    userID INT NOT NULL,
    imageSrc TEXT,
    FOREIGN KEY(userID) REFERENCES users(userID)
);

CREATE TABLE reading_list(
    book_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userID INTEGER NOT NULL,
    imageSrc TEXT,
    FOREIGN KEY(userID) REFERENCES users(userID)
);

CREATE TABLE users(
    userID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

SELECT reviews.review_id, reviews.title, reviews.author, reviews.rating, reviews.review, reviews.userID, reviews.imageSrc, users.username
FROM reviews
JOIN users ON reviews.userID = users.userID;
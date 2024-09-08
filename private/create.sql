CREATE TABLE reviews(
    review_id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT,
    user_id INT NOT NULL,
    image_src TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE reading_list(
    book_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date_added TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE users(
    user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


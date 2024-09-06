CREATE TABLE reviews(
    review_id  INT NOT NULL PRIMARY KEY, 
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE reading_list(
    book_id INT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date_added TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE users(
    user_id INT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);


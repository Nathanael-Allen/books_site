CREATE TABLE reviews(
    review_id  INT NOT NULL PRIMARY KEY, 
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO users(username, password)
VALUES('Natty', 'pawsword');

INSERT INTO reviews(title, author, rating, review, user_id)
VALUES('A Wise Mans Fear', 'Patrick Rothfuss', '9', 'Eos eligendi, quisquam numquam vitae necessitatibus, adipisci veniam recusandae, unde pariatur quod aliquid nam aliquam cupiditate quos libero blanditiis.', '1');
VALUES('The Name of the Wind', 'Patrick Rothfuss', '10', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt delectus reprehenderit eos eligendi.', '1');
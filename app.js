import { router as books } from './routes/books.js';
import { router as login } from './routes/login.js'
import { SQLiteStore, session } from './middleware/session.cjs';
import express from 'express';
import { getAllReviews } from './database/booksdb.cjs';
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// session
app.use(session({
    store: new SQLiteStore({
        table: 'sessions',
        dir: 'C:/personalprojects/node_projects/new_express_practice/private',
        createDirIfNotExists: 'false',
        concurrentDB: 'false',
    }),
    saveUninitialized: true,
    resave: true,
    secret: 'hahaha',
    cookie: { maxAge: 90000000, secure: false, sameSite: 'none'}
}))

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/books', books);
app.use('/login', login);

app.get('/', async (req, res) =>{
    const user = req.session.user
    const books = await getAllReviews();
    res.status(200).render('pages/reviews', {books, user})
});

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
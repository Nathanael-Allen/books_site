import { router as books } from './routes/books.js';
import { router as login } from './routes/login.js'
import { SQLiteStore, session } from './middleware/session.cjs';
import express from 'express';
import { getAllReviews } from './database/booksdb.cjs';
const app = express();
const port = 3000;

app.use(express.static('public'))
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
    saveUninitialized: false,
    resave: true,
    secret: 'hahaha',
    cookie: { maxAge: 3600, secure: false}
}))

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/books', books);
app.use('/login', login)



app.get('/', async (req, res) =>{
    const books = await getAllReviews()
    res.status(200).render('pages/reviews', {books})
});

app.get('/destroy', (req, res)=>{
    req.session.destroy();
    res.send('Session ended')
})

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
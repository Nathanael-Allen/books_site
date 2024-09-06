import { router as books } from './routes/books.js';
import { SQLiteStore, session } from './middleware/session.cjs';
import express from 'express';
import { getAllReviews } from './database/booksdb.cjs';
const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

// session
app.use(session({
    store: new SQLiteStore({
        table: 'sessions',
        dir: 'C:/personalprojects/node_projects/new_express_practice/private',
        createDirIfNotExists: 'false',
        concurrentDB: 'false',
    }),
    secret: 'shhh',
    cookie: { maxAge: 3600, sameSite: 'none', secure: true}
}))

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/books', books);



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
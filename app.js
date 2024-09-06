import { router as books } from './routes/books.js';
// import { router as admin } from './routes/admin.js';
import express from 'express';
import { getAllReviews } from './database/database.cjs';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

// Routes
app.use('/books', books);
// app.use('/admin', admin);



app.get('/', async (req, res) =>{
    const books = await getAllReviews()
    res.render('pages/reviews', {books})
});

app.get('/destroy', (req, res)=>{
    req.session.destroy();
    res.send('Session ended')
})

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
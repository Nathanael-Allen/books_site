import express from 'express'
import { getBookDiv } from '../views/finishedBooks.js'
import { addFinishedBook, addUnreadBook } from '../views/addBook.js'
import { insertFinishedBook, insertUnreadBook, searchDB } from '../database/database.cjs'
import { getUnfinishedBooks } from '../views/unreadBooks.js'
import { getSearchList } from '../views/searchBooks.js'
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get('/finished', async (req, res)=>{
    res.send(await getBookDiv())
})

router.get('/unread', async (req, res)=>{
    res.send(await getUnfinishedBooks())
})


router.get('/add/finished', (req, res)=>{
    res.send(addFinishedBook())
})

router.get('/add/unread', (req, res)=>{
    res.send(addUnreadBook())
})

router.post('/add/finished', (req, res)=>{
    const book = req.body;
    insertFinishedBook(book.title, book.author, book.rating, book.review);
    res.status(201).send('<p>Book added!</p>');
})

router.post('/add/unread', (req, res)=>{
    const book = req.body;
    insertUnreadBook(book.title, book.author);
    res.status(201).send('<p>Book added!</p>');
})


router.post('/search', async (req, res)=>{
    const usrSearch = req.body["search-bar"].trim();
    let html;
    if(!usrSearch){
        html = await getBookDiv()
    }
    else{
        html = await getSearchList(usrSearch);
    }
    res.send(html);
})

export {router}
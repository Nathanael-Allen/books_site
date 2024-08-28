import express from 'express'
import { getFinishedBooks } from '../views/finishedBooks.js'
import { addFinishedBook, addUnreadBook } from '../views/addBook.js'
import { insertFinishedBook, insertUnreadBook } from '../database/database.cjs'
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded())

router.get('/finished', async (req, res)=>{
    res.send(await getFinishedBooks())
})

router.get('/unread', async (req, res)=>{
    res.send()
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
    res.status(201).redirect('/admin/dashboard');
})

router.post('/add/unread', (req, res)=>{
    const book = req.body;
    insertUnreadBook(book.title, book.author);
    res.status(201).redirect('/admin/dashboard')
})


export {router}
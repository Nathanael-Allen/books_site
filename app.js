import { CreateIndexPage } from './views/index.js'
import { addBook } from './views/addBook.js'
import { getFinishedBooks } from './views/finishedBooks.js'
import {insertBook, returnAllBooks} from './database/database.cjs'
import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) =>{
    res.send(CreateIndexPage())
})

app.get('/addbook', (req, res) =>{
    res.send(addBook())
})

app.post('/addbook', (req, res) => {
    let book = req.body
    insertBook(book["title"], book["author"], book["rating"])
    res.send(CreateIndexPage())
})

app.get('/finishedbooks', async (req, res) => {
    const finishedBooks = await getFinishedBooks()
    res.send(finishedBooks)
})

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
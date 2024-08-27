import { CreateIndexPage } from './views/index.js'
// import { addFinishedBook } from './views/addFinishedBook.js'
// import { getFinishedBooks } from './views/finishedBooks.js'
// import {insertBook, returnAllBooks} from './database/database.cjs'
import { router } from './routes/books.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/books', router)
app.use(express.json())
app.use(express.urlencoded())

app.get('/', async (req, res) =>{
    res.send(await CreateIndexPage())
})

// app.get('/addbook', (req, res) =>{
//     res.send(addFinishedBook())
// })

// app.post('/addfinishedbook', (req, res) => {
//     let book = req.body
//     insertBook(book["title"], book["author"], book["rating"])
//     res.send(CreateIndexPage())
// })

// app.get('/finishedbooks', async (req, res) => {
//     const finishedBooks = await getFinishedBooks()
//     res.send(finishedBooks)
// })

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
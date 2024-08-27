import express from 'express'
import { getFinishedBooks } from '../views/finishedBooks.js'
const router = express.Router()

router.get('/finished', async (req, res)=>{
    res.send(await getFinishedBooks())
})

router.get('/unread', async (req, res)=>{
    res.send()
})

export {router}
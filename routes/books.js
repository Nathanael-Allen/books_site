import express from 'express';
import { getAllReviews, getReadingList } from '../database/booksdb.cjs';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

router.get('/readinglist', async (req, res)=>{
    const books = await getReadingList();
    res.render('partials/readingList', {books});
});

router.get('/reviews', async (req, res)=>{ 
    const books = await getAllReviews();
    res.render('partials/allReviews', {books});
});

router.get('/reviews/add', async (req, res) => {
    res.render('partials/addReview')
})

export {router}
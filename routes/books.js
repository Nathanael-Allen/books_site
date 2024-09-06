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

// router.get('/reviews/add/:bookid', async (req, res) => {
//     const {bookid} = req.params
//     let book = await getBook(bookid)
//     res.send(addSemicompleteReview(book.TITLE, book.AUTHOR));
// });

// router.post('/search', async (req, res)=>{
//     const usrSearch = req.body["search-bar"].trim();
//     let html;
//     if(!usrSearch){
//         html = await allReviews()
//     }
//     else{
//         html = await searchReviews(usrSearch);
//     }
//     res.send(html);
// });

export {router}
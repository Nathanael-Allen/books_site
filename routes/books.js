import express from 'express';
import { addReview, getAllReviews, getGoogleBooks, getReadingList } from '../database/booksdb.cjs';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

// get requests
router.get('/readinglist', async (req, res)=>{
    const books = await getReadingList();
    res.render('partials/readingList', {books});
});

router.get('/reviews', async (req, res)=>{ 
    const books = await getAllReviews();
    res.render('partials/allReviews', {books});
});

router.get('/add', async (req, res) => {
    res.render('partials/addBookSearch')
})


// post requests
router.post('/googlebooks', async (req, res)=>{
    try{
        const search = req.body.searchBar;
        if(search.trim() == ''){
            res.status(200).send('')
        }
        else{
            const books = await getGoogleBooks(search);
            res.status(200).render('partials/book', {books})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post('/reviews/add', (req, res)=>{
    const book = req.body;
    console.log(book)
    try{
        addReview(book)    
    }
    catch(err){
        console.log(err)
    }
    res.status(200).render('partials/success')
})

router.post('/reviews/add/form', (req, res)=>{
    const book = req.body;
    res.status(200).render('partials/addReviewForm', {book});
    // res.status(200).render('partials/success')
})

router.post('/readinglist/add/form', (req, res)=>{
    return
})

export {router}
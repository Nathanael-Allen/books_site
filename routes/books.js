import express from 'express';
import { addReview, addToReadingList, getAllReviews, getGoogleBooks, getImageSrc, getReadingList, getUserReviews } from '../database/booksdb.cjs';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

// get requests
router.get('/readinglist', async (req, res)=>{
    const userID = req.session.user.userID;
    const books = await getReadingList(userID);
    res.render('partials/readingList', {books});
});

router.get('/reviews', async (req, res)=>{ 
    const books = await getAllReviews();
    res.render('partials/allReviews', {books});
});

router.get('/add', async (req, res) => {
    res.render('partials/addBookSearch')
})

router.get('/userreviews', async (req, res)=>{
    const userID = req.session.user.userID
    const books = await getUserReviews(userID)
    res.render('partials/allReviews', {books})
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
    const userID = req.session.user.userID;
    try{
        addReview(book, userID);
    }
    catch(err){
        console.log(err);
    }
    res.status(200).render('partials/success');
})

router.post('/reviews/add/form', async (req, res)=>{
    const book = req.body;
    if(book.book_id){
        const {imageSrc} = await getImageSrc(book.book_id)
        book.imageSrc = imageSrc;
    }
    res.status(200).render('partials/addReviewForm', {book});
})

router.post('/readinglist/add', async (req, res)=>{
    const book = req.body;
    const userID = req.session.user.userID;
    await addToReadingList(book, userID);
    res.status(200).render('partials/checkmark')
})

export {router}
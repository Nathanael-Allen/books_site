import express from 'express';
import { allReviews } from '../views/allReviews.js';
import { searchReviews } from '../views/searchReviews.js';
import { readingList } from '../views/readingList.js';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

router.all('/readinglist', async (req, res)=>{
    res.send(await readingList())
})

router.get('/reviews', async (req, res)=>{ 
    res.send(await allReviews())
});

router.post('/search', async (req, res)=>{
    const usrSearch = req.body["search-bar"].trim();
    let html;
    if(!usrSearch){
        html = await allReviews()
    }
    else{
        html = await searchReviews(usrSearch);
    }
    res.send(html);
});

export {router}
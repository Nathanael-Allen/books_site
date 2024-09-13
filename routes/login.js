import express from 'express';
import pkg from '../database/usersdb.cjs';
const { validateUser, addUser } = pkg
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

router.get('/', (req, res)=>{
    res.render('partials/login')
})

router.get('/create', (req, res)=>{
    res.render('partials/createAccount');
})

router.post('/create', async (req, res)=>{
    const user = req.body
    if(user.username && user.password){
        try{
            await addUser(user.username, user.password);
        }
        catch(err){
            console.log(err)
            res.status(500)
        }
        res.render('partials/checkmark');
    }
    else{
        res.render('invalid')
    }
})

router.post('/valid', async (req, res)=>{
    const user = req.body;
    if(user.username && user.password){
        const validUser = await validateUser(user.username, user.password);
        if(validUser){
            req.session.userID = validUser.userID;
            req.session.save()
            console.log(req.session.userID)
            res.status(200).render('partials/checkmark')
        }
        else{
            console.log('NO')
            res.render('partials/invalid')
        }
    }
    else{
        console.log('no data in form')
        res.render('partials/invalid')
    }

})



export {router}
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
        res.render('partials/success');
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
            req.session.user = {userID: Number(validUser.userID), username: validUser.username};
            const user = req.session.user;
            res.status(200).render('partials/successfulLogin', {user})
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

router.get('/logout', (req, res)=>{
    req.session.destroy()
    const user = req.session;
    res.render('partials/successfulLogin', {user})
})

export {router}
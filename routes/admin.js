import express from 'express';
import { createAdminPage } from '../views/adminDashboard.js';
import { createLoginPage } from '../views/adminLogin.js';
import { validUser } from '../database/database.cjs';
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded())


router.get('/dashboard', (req, res)=>{
    if(req.session.isAuth){
        res.send(createAdminPage())
    }
    else{
        res.redirect('/admin/login')
    }
});

router.get('/login', (req, res)=>{
    res.send(createLoginPage())
});

router.post('/login', async (req, res)=>{
    const valid = await validUser(req.body.username, req.body.password);
    console.log(valid)
    if(valid){
        req.session.isAuth = true;
        res.status(200).redirect('/admin/dashboard');
    }
    else{
        res.status(401).send('Invalid credentials')
    }

})

export { router }
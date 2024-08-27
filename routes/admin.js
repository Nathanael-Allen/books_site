import express from 'express';
import { createAdminPage } from '../views/adminDashboard.js'
const router = express.Router();

router.get('/', (req, res)=>{
    res.send(createAdminPage())
})
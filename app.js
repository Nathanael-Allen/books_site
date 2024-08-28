import { CreateIndexPage } from './views/index.js';
import { router as books } from './routes/books.js';
import { router as admin } from './routes/admin.js';
import connect from 'connect-sqlite3';
import session from 'express-session';
import express from 'express';
const app = express();
const port = 3000;
const SQLITEStore = connect(session)
const store = new SQLITEStore({
    dir: 'C:/personalprojects/node_projects/new_express_practice/private',
    table: 'SESSIONS',
    concurrentDB: false
})

app.use(express.static('public'));
app.use(session({
    store: store,
    secret: 'Shhhh',
    saveUninitialized: true,
    resave: false,
    cookie:{
        maxAge: 3600000
    },
}));
app.use('/books', books);
app.use('/admin', admin);
app.use(express.json());
app.use(express.urlencoded());


app.get('/', async (req, res) =>{
    res.send(await CreateIndexPage())
});

app.get('/destroy', (req, res)=>{
    req.session.destroy();
    res.send('Session ended')
})

app.listen(port, () => {
    console.log(`Server active and listening on ${port}`)
})
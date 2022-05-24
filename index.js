const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fupload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./routes/Routes')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fupload());

dotenv.config();

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

app.use(router)

const port = process.env.PORT || 8745;
const db = process.env.LOCAL_DB_URL;


mongoose.connect(db).then(res=>{
    console.log("Connected to db")
}).catch(err=>{
    console.log(err)
})


app.listen(port,()=>{
    console.log(`listening to ${port}`)
})
// revising the content learned
//1) require express , make express object and make a server and run in localhost 5000 using listen and get is used to request data from the specified source.
const express = require("express");
const app = express();// object of express js framework
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path=require("path");// * for connecting css and html with hbs engine
const mysql = require('mysql');


dotenv.config({
    path:'./.env',
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// for using static file for css

app.use(express.static('public'));


// setting template engine
app.set('view engine','hbs');


const partialpath=path.join(__dirname,"./views/layout");
//regsitering partials
hbs.registerPartials(partialpath);

/*
use it in controller.js
//  connection pool
const pool = mysql.createPool({
    connectionLimit:100,
    host : process.env.database_host,
    user : process.env.database_user,
    password : process.env.database_password,
    database:process.env.database,
})

// connect to db
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('connected to db'+ connection);

})
*/


//routes
/* use it in routes folder as separate file
app.get('',(req,res)=>{
    res.render('home');
})
*/
const routes = require('./server/routes/user');
app.use('/',routes);



app.listen(5000,()=>{
    console.log("server is running at http://localhost:5000/")
})
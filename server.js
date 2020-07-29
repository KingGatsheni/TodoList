const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');


//initializing express app
const app = express();

//declare port variables
const PORT = process.env.PORT || 8000;

// initializing body-parser midddleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connect to DB
require('./config/db');
app.use(routes);


//starting server on PORT 8000
app.listen(PORT, ()=>{
    console.log(`Server live on PORT:${PORT}`);
})
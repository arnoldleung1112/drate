const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//routers
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const project=require('./routes/api/projects');
const util = require('./routes/api/util');


var app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport middleware

app.use(passport.initialize());

//passport config

require('./config/passport')(passport);

// DB config
var db = require('./config/keys').mongoURI;

// Connect to MongoDB

mongoose.connect(db)
.then(()=>{
    console.log('mongoDB connected');
}).catch((err)=>{
    console.log(err);
}) 

//Routers
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);
app.use('/api/projects', project);
app.use('/api/util',util);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','indexed.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`listening at ${port}`);
});
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

var app = express();

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


app.get('/',(req,res)=>{
    res.send('hello world');
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`listening at ${port}`);
});
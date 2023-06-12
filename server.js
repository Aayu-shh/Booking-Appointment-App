const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');

const app = express();

const read_query = 'SELECT * FROM users';
const create_query = ('INSERT INTO users(Name,Email,Phone) VALUES(?,?,?)');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

app.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    db.execute(create_query,[name,email,phone])
    .then((result) => {
        console.log("Result Inserted")
    })
    .catch(err => console.log(err))    
})

app.listen(1000);
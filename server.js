const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminController = require('./controller/admin');
const db = require('./util/database');

const app = express();

const read_query = 'SELECT * FROM users';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post("/add-user", adminController.addUser);

app.get("/users", adminController.showUsers);

app.delete("/users/:uid",adminController.deleteUser);

app.listen(1000);
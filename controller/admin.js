const db = require('../util/database');

exports.addUser = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    db.execute('INSERT INTO users(Name,Email,Phone) VALUES(?,?,?)', [name, email, phone])
        .then((result) => {
            console.log("Result Inserted");
            res.send(result);
        })
        .catch(err => console.log(err))
};

//Note: Sending result[0] => rows in Array form
exports.showUsers = (req, res) => {
    console.log('fething Users')
    db.execute('SELECT * FROM users')
        .then((result) => {
            res.send(result[0]);
        })
}
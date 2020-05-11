const express = require ('express');
const connection = require('./conf');
const app = express()
const bodyParser = require('body-parser');
const port = 5000;
const cors = require ('cors');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(session({
    secret: 'keyboard cat'
}))

// check DB connection working
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.send('it worksss!')
})

app.post('/user', (req, res) => {

    const formData = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        birth_date: req.body.birthdate,
        email: req.body.email,
        password: req.body.password,
        repeat_password: req.body.password,
    }
    connection.query('INSERT INTO user SET ?', formData, (err) => {
        if(err){
            res.status(500).send('Error registering your user')
        } else {
            res.sendStatus(200)
        }
    })
});


// sees if the user and password are in the database
app.post('/log', (req, res) => {

    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, results) => {
        if (err){
            console.log('error', err)
            res.status(500).send('Error logging in')
        }

        // if (!results.username) {
        //     res.status(404).send('No such user in the database')
        // }

        if (results){
            req.session.regenerate( ()=>{
            req.session.login = true;
            req.session.username = req.body.username;
            res.json(results)
            console.log('results hereeeee', results)
        });
    }})
})



app.listen(port, (err) => {
    if (err) {
        throw new Error('Something did not work');
    }
    console.log(`Server is listening on port ${port}`);
});


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
});


// sees if the user and password are in the database
app.post('/log', (req, res) => {

    connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, results) => {
        if (err){
            console.log('error', err)
            res.status(500).send('No such user in the database')
        }

        if (results){
            req.session.regenerate( ()=>{
            req.session.login = true;
            req.session.username = req.body.username;
            res.json(results)
        });
    }})
})



app.listen(port, (err) => {
    if (err) {
        throw new Error('Something did not work');
    }
    console.log(`Server is listening on port ${port}`);
});


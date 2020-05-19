// const  mysql = require('mysql');
// const  connection = mysql.createConnection({
//   host :  'localhost', // address of the server
//   user :  'root', // username
//   password :  'password',
//   database :  'la_pegatina',
// });

// module.exports = connection;



const  mysql = require('mysql');
const  connection = mysql.createConnection({
  host :  'eu-cdbr-west-03.cleardb.net', // address of the server
  user :  'b5f9b9d64a08a1', // username
  password :  'b92c0705',
  database :  'heroku_1c259aae7108d91',
});

module.exports = connection;
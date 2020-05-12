const express = require('express');
const connection = require('./conf');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const cors = require('cors');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(
	session({
		secret: 'keyboard cat'
	})
);

// check DB connection working
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
	res.send('it worksss!');
});

app.post('/user', (req, res) => {
	let formData = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		username: req.body.username,
		birth_date: req.body.birthdate,
		email: req.body.email,
		password: req.body.password,
		repeat_password: req.body.repeatedPassword
	};

	//Variable where we are going to keep al the errors as literal objects with the message of the error and the color of the text
	let errors = [];

	//Condition to check if there is an empty field
	if (
		!formData.first_name ||
		!formData.last_name ||
		!formData.username ||
		!formData.birth_date ||
		!formData.email ||
		!formData.password ||
		!formData.repeat_password
	) {
		errors.push({
			msg: 'You have to fill all inputs',
			color: 'tomato'
		});
	}

	// START --> Conditions to check if the date is written in the right format

	//The error message that is going to be pushed into errors
	const errorMessage = 'The format of your date is not correct. Please try again.';

	//This condition checks if the user put the date like this 9-5-1994 or like this 9/5/1994 (both of them are valid). If the user did not put a '-' or a '/' on the input, then its going to be filled with an array with two empty items so it forces an error later on the code.
	if (formData.birth_date.includes('-')) {
		formData.birth_date = formData.birth_date.split('-');
	} else if (formData.birth_date.includes('/')) {
		formData.birth_date = formData.birth_date.split('/');
	} else {
		formData.birth_date = [ '', '' ];
	}

	//Put the date in the order that SQL asks for the date value (YYYY-MM-DD), and add a '0' to the left when the month or day is given with only one digit
	let transcriptedDate = [
		formData.birth_date[2],
		formData.birth_date[1].padStart(2, '0'),
		formData.birth_date[0].padStart(2, '0')
	];

	//Check that the date content of the date is not undefined
	if (transcriptedDate[0] !== undefined) {
		//Check if the user is putting more days that there are in the month
		if ([ '01', '03', '05', '07', '08', '10', '12' ].includes(transcriptedDate[1])) {
			if (transcriptedDate[2] > 31 || transcriptedDate[2] < 1) {
				errors.push({
					msg: 'For this month, select a day between 1 and 31',
					color: 'tomato'
				});
			}
		} else if ([ '04', '06', '09', '11' ].includes(transcriptedDate[1])) {
			if (transcriptedDate[2] > 30 || transcriptedDate[2] < 1) {
				errors.push({
					msg: 'For this month, select a day between 1 and 30',
					color: 'tomato'
				});
			}
		} else if ([ '02' ].includes(transcriptedDate[1])) {
			if (transcriptedDate[2] > 28 || transcriptedDate[2] < 1) {
				errors.push({
					msg: 'For this month, select a day between 1 and 28',
					color: 'tomato'
				});
			}
		} else {
			errors.push({
				msg: 'Please insert a valid month',
				color: 'tomato'
			});
		}

		//Check if the date given is in the correct format. If it is, formData.birth_date should be an array with 3 items: [YYYY, MM, DD]. If it isn't, push the message to the errors array
		if (transcriptedDate[0].length !== 4 || transcriptedDate[1].length !== 2 || transcriptedDate[2].length !== 2) {
			errors.push({
				msg: errorMessage,
				color: 'tomato'
			});
		} else {
			//If everything is correct, change the value of formData.birth_date and transform the array into a string
			formData.birth_date = transcriptedDate.join('-');
		}
	} else {
		errors.push({
			msg: errorMessage,
			color: 'tomato'
		});
	}

	//Condition to check if the password has at least 6 characters
	if (formData.password.length < 6) {
		errors.push({
			msg: 'Your password has to be at least 6 characters long',
			color: 'tomato'
		});
	}

	//Condition to check if both passwords are the same
	if (formData.password !== formData.repeat_password) {
		errors.push({
			msg: "Password don't match. Please, try again",
			color: 'tomato'
		});
	}

	if (errors.length > 0) {
		res.send(errors);
	} else {
		connection.query('INSERT INTO user SET ?', formData, (err, results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(200).send([ { msg: 'User created succesfully!', color: 'lime' } ]);
			}
		});
	}
});

// sees if the user and password are in the database
app.post('/log', (req, res) => {
	connection.query(
		'SELECT * FROM user WHERE username = ? AND password = ?',
		[ req.body.username, req.body.password ],
		(err, results) => {
			if (err) {
				console.log('error', err);
				res.status(500).send('No such user in the database');
			}

			if (results) {
				req.session.regenerate(() => {
					req.session.login = true;
					req.session.username = req.body.username;
					res.json(results);
					console.log('results hereeeee', results);
				});
			}
		}
	);
});

app.listen(port, (err) => {
	if (err) {
		throw new Error('Something did not work');
	}
	console.log(`Server is listening on port ${port}`);
});

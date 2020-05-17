import React, { Fragment, useEffect, useState } from 'react';

import texts from '../../.././../texts.json';

const SignUp = ({language}) => {

    console.log(texts[language])
    
	// const { logUserIntoContext } = React.useContext(MyContext);
	let [ users, updateUsers ] = useState([]);
	let [ firstName, setFirstName ] = useState('');
	let [ lastName, setLastName ] = useState('');
	let [ username, setUsername ] = useState('');
	let [ birthdate, setBirthDate ] = useState('');
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ repeatedPassword, setRepeatedPassword ] = useState('');
	let [ posted, setPosted ] = useState(false);

	//State where we are going to keep the error and messages on the register page that we receive from the backend
	let [ messages, setMessages ] = useState([]);

	const postProfile = (e) => {
		e.preventDefault();

		fetch('//localhost:5000/user', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ firstName, lastName, username, birthdate, email, password, repeatedPassword })
		})
			.then((res) => {
				if (res) {
					setPosted(!posted);
				}
				return res.json();
			})
			.then((dataJSON) => {
				setMessages(dataJSON);
			});

			// setFirstName((firstName = ''));
			// setLastName((lastName = ''));
			// setUsername((username = ''));
			// setBirthDate((birthdate = ''));
			// setEmail((email = ''));
			// setPassword((password = ''));
			// setRepeatedPassword((repeatedPassword = ''));
	};

	return (
		<div id="signup-tab-content" className="active tabs-content">
			<form className="signup-form" onSubmit={postProfile}>
				<input
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					name="first_name"
					// placeholder={texts[language].firstName}
				/>
				<br />
				<input
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					name="last_name"
					// placeholder={texts[language].lastName}
				/>
				<br />
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					name="username"
                    // placeholder={texts[language].username}
					type="text"
					className="input"
					id="user_name"
				/>
				<br />
				<input
					value={birthdate}
					onChange={(e) => setBirthDate(e.target.value)}
					name="birth_date"
                    // placeholder={texts[language].birth_date + " (D/M/Y)"}
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="mail"
                    // placeholder={texts[language].mail}
					type="email"
					className="input"
					id="user_email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
                    // placeholder={texts[language].password}
					type="password"
					className="input"
					id="user_pass"
				/>
				<input
					value={repeatedPassword}
					onChange={(e) => setRepeatedPassword(e.target.value)}
					name="repeatPassword"
                    // placeholder={texts[language].repeatPassword}
					type="password"
					className="input"
					id="user_repeat_pass"
				/>
				<br />
				<button type="submit" style={{ color: 'black' }}>
					{texts[language].register}
				</button>
			</form>
			{messages.length > 0 && <div style={{ color: messages[0].color }}>{messages[0].msg}</div>}
		</div>
	);
};

export default SignUp;

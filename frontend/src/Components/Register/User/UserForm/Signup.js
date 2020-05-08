import React, { Fragment, useEffect, useState } from 'react';
import { MyContext } from '../../../../context/MyProvider';

const SignUp = () => {

    // const { logUserIntoContext } = React.useContext(MyContext);
    let [users, updateUsers] = useState([])
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [username, setUsername] = useState('')
    let [birthdate, setBirthDate] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    // let [repeatedPassword, setRepeatedPassword] = useState('')
    let [posted, setPosted] = useState(false)

    const postProfile = e => {
        e.preventDefault()

        fetch('//localhost:5000/user', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ firstName, lastName, username, birthdate, email, password })
        }).then(res => {
            if(res) {
                setPosted(!posted)
                alert("Registered!")
            }
        })

        setFirstName(firstName = "")
        setLastName(lastName = "")
        setUsername(username = "")
        setBirthDate(birthdate = "")
        setEmail(email = "")
        setPassword(password = "")
    }

    return(
        <div id="signup-tab-content" className="active tabs-content">
            <form className="signup-form" onSubmit={postProfile}>
                <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    name="first_name"
                    placeholder="nombre"
                />
                <br />
                <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    name="last_name"
                    placeholder="apellidos"
                />
                <br />
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    name="username"
                    placeholder="username"
                    type="text"
                    className="input"
                    id="user_name"
                />
                <br />
                <input
                    value={birthdate}
                    onChange={e => setBirthDate(e.target.value)}
                    name="birth_date"
                    placeholder="birth date"
                />
                <br />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="mail"
                    placeholder="e-mail"
                    type="email"
                    className="input"
                    id="user_email"
                />
                <br />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    placeholder="password"
                    type="password"
                    className="input"
                    id="user_pass"
                />
                <br />
                <button type="submit">Registrarme</button>
            </form>
        </div>
    )
};

export default SignUp;

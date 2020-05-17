/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
import React, { Fragment, useState } from 'react';
import { MyContext } from '../../../../context/MyProvider';
// import '../UserProfile/Userprofile.css';


const Login = (props) => {

    const { logUserIntoContext, addPoints } = React.useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const closeModal = () => {
        const closeModalButton = document.querySelector('.modalClosingButton');
        closeModalButton.click();
    }

    const logUser = (e) => {
        e.preventDefault();
        console.log('username and password', username, password);
        fetch('//localhost:5000/log', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ username, password }),
        }).then((res) => {
            console.log('response', res);
            if (res.status === 200) {
                // alert('logged in!');
                closeModal();
                console.log('logggggged innnn');
                return res.json();
            }
        }).then((data) => {
            console.log('data you pass to the context', data);
            logUserIntoContext(data);
        });
        if (props.pageIn === 'between-rounds') {
            addPoints(props.score, 'spotify', 'one');
        }
    };

    return (
        <div>
            {/* <MyContext.Consumer>
                {(context) => ( */}
            <Fragment>
                <div id="login-tab-content" className="active tabs-content">
                    <form className="login-form" onSubmit={logUser}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            placeholder="usuario"
                            type="text"
                            className="input"
                            id="user_login"
                        />
                        <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="contraseña"
                            type="password"
                            className="input"
                            id="user_pass"
                        />
                        {/* <label
                                    className="remember"
                                    htmlFor="remember_me"
                                >
                                    Remember me
                                </label> */}
                        <button className="form-btn" type="submit">Entra!</button>
                    </form>
                </div>
            </Fragment>
            {/* )}
            </MyContext.Consumer> */}
        </div>
    );
};

export default Login;

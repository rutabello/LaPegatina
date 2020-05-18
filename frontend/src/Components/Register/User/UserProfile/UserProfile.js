import React, { Fragment, useState } from 'react';
import { MyContext } from '../../../../context/MyProvider';
import './UserProfile.css';

const UserPofile = () => {

    const { logUserIntoContext } = React.useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            // if (res.status === 404) {
            //    alert('invalid username or password')
            // }
            if (res.status === 200) {
                alert('logged in!');
                console.log('logggggged innnn');
                return res.json();
            }
        }).then((data) => {
            console.log('data you pass to the context', data);
            // data.username && logUserIntoContext(data)
            logUserIntoContext(data);
            setUsername('');
            setPassword('');
        });
    };


    return (
        <div>
            <MyContext.Consumer>
                {(context) => (
                    <Fragment className="profile-text">
                        <hr />
                        <h1>Mi Perfil</h1>
                        <h6>
                            Nombre:
                            {context.state.first_name}
                        </h6>
                        <h6>
                            Nombre de usuario:
                            {context.state.username}
                        </h6>
                        <h6>
                            Puntos totales:
                            {context.state.total_app_points}
                        </h6>
                        <h6>
                            Puntos Música
                        </h6>
                        <p>
                            Ronda 1:
                            {context.state.points_spotify_round_one}
                        </p>

                        <p>
                            Ronda 2:
                            {context.state.points_spotify_round_two}
                        </p>
                        <h6>
                            Puntos vídeos
                        </h6>
                        <p>
                            Ronda 1:
                            {context.state.points_youtube_round_one}
                        </p>
                        <p>
                            Ronda 2:
                            {context.state.points_youtube_round_two}
                        </p>
                        <h6>
                            Puntos fotos
                        </h6>
                        <p>
                            Ronda 1:
                            {context.state.points_instagram_round_one}
                        </p>
                        <p>
                            Ronda 2:
                            {context.state.points_instagram_round_two}
                        </p>

                        <div>
                            <form onSubmit={logUser}>
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
                                <button type="submit">Log in!</button>
                            </form>
                        </div>
                    </Fragment>
                )}
            </MyContext.Consumer>
        </div>
    );
};

export default UserPofile;

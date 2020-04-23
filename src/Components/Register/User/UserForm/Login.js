/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';

const Login = () => (
    <Fragment>
        <div id="login-tab-content" className="active tabs-content">
            <form className="login-form" action="" method="post">
                <input
                    type="text"
                    className="input"
                    id="user_login"
                    placeholder="Email or Username"
                />
                <input
                    type="password"
                    className="input"
                    id="user_pass"
                    placeholder="Password"
                />
                <input
                    type="checkbox"
                    className="checkbox"
                    id="remember_me"
                />
                <label
                    className="remember"
                    htmlFor="remember_me"
                >
                    Remember me
                </label>
                <input
                    type="submit"
                    className="button"
                    value="Login"
                />
            </form>
        </div>
    </Fragment>
);

export default Login;

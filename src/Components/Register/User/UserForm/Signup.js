import React from 'react';

const SignUp = () => (
    <div id="signup-tab-content" className="active tabs-content">
        <form className="signup-form" action="" method="post">
            <input
                type="email"
                className="input"
                id="user_email"
                placeholder="Email"
            />
            <input
                type="text"
                className="input"
                id="user_name"
                placeholder="Username"
            />
            <input
                type="password"
                className="input"
                id="user_pass"
                placeholder="Password"
            />
            <input type="submit" className="button" value="Sign Up" />
        </form>
    </div>
);

export default SignUp;

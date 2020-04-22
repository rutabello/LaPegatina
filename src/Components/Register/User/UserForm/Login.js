import React, {Fragment} from 'react'

const Login = () => {
    return (
      <React.Fragment>
        <div id="login-tab-content">
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
            <input type="checkbox" className="checkbox" id="remember_me" />
            <label htmlFor="remember_me">Remember me</label>
  
            <input type="submit" className="button" value="Login" />
          </form>
        </div>
      </React.Fragment>
    );
  };

  export default Login
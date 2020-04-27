import React from 'react';
import SignUp from './Signup';
import Login from './Login';
import Panel from './Panel';
import FormPanel from './FormPanel';
import MyProvider from '../../../../context/MyProvider';
// import texts from '../../../../texts.json';
import './UserForm.css';

const UserForm = ({ mainpage }) => (
// constructor(props) {
//   super(props);

    //   this.state = {
    //       lastname: '',
    //       firstname: '',
    //       email: '',
    //       notLogged: true,
    //     };

    //   this.onChange = this.onChange.bind(this);
    //   this.onClick = this.onClick.bind(this);
    //   this.submitForm = this.submitForm.bind(this);
    //   this.apiURL = this.apiURL.bind(this);
    // }
    // apiURL() {
    //   const url = "";
    //   const config = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(this.state)
    //   };

    //   fetch(url, config)
    //     .then(res => res.json())
    //     .then(res => {
    //       if (res.error) {
    //         alert(res.error);
    //       } else {
    //         alert(`Benvingut! Los puntos son guardados!`);
    //       }
    //     })
    //     .catch(e => {
    //       console.error(e);
    //       alert("Prova otra vez");
    //     });
    // }
    // onChange(e) {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   });
    // }
    // onClick(e) {
    //   this.apiURL();
    // }
    // submitForm(e) {
    //   e.preventDefault();
    //   this.setState({
    //     notLogged:false
    //   })
    // }


    mainpage
        ? (
            <div>
                <button
                    type="button"
                    className="navbar-enter-btn"
                    data-toggle="modal"
                    data-target="#register"
                >
                    Entra
                </button>
                <div
                    className="modal fade"
                    id="register"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="register">Welcome, keep playing!</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" />
                            <div className="form-wrap">
                                <MyProvider>
                                    <div className="tabs">
                                        <Panel id="login">
                                            <h2 className="login-tab">Login</h2>
                                        </Panel>
                                        <Panel id="signup">
                                            <h2 className="signup-tab">Sign Up</h2>
                                        </Panel>
                                    </div>

                                    <FormPanel isActive="login">
                                        <Login />
                                    </FormPanel>

                                    <FormPanel isActive="signup">
                                        <SignUp />
                                    </FormPanel>
                                </MyProvider>
                            </div>
                            );
                        </div>
                    </div>
                </div>
            </div>
        )
        : (
            <div>
                <button
                    type="button"
                    className="navbar-btn"
                    data-toggle="modal"
                    data-target="#register"
                >
                    Regístrate y ve a la Ronda 2
                </button>
                <div
                    className="modal fade"
                    id="register"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="register">Welcome, keep playing!</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" />
                            <div className="form-wrap">
                                <MyProvider>
                                    <div className="tabs">
                                        <Panel id="login">
                                            <h2 className="login-tab">Login</h2>
                                        </Panel>
                                        <Panel id="signup">
                                            <h2 className="signup-tab">Sign Up</h2>
                                        </Panel>
                                    </div>

                                    <FormPanel isActive="login">
                                        <Login />
                                    </FormPanel>

                                    <FormPanel isActive="signup">
                                        <SignUp />
                                    </FormPanel>
                                </MyProvider>
                            </div>
                            );
                        </div>
                    </div>
                </div>
            </div>
        )
);

export default UserForm;

import React from 'react';
import SignUp from './Signup';
import Login from './Login';
import Panel from './Panel';
import FormPanel from './FormPanel';
import MyProvider from '../../../../context/MyProvider';
import texts from '../../../../texts.json';
import './UserForm.css';

const UserForm = ({ mainpage, language, score, gameIn }) => (

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
                                {/* <h5 className="modal-title" id="register">Welcome, keep playing!</h5> */}
                                <button
                                    type="button"
                                    className="close modalClosingButton"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* <div className="modal-body" /> */}
                            <div className="form-wrap">
                                {/* <MyProvider> */}
                                    <div className="tabs">
                                        <Panel id="login">
                                            {/* <h2 className="login-tab">{texts[language].login}</h2> */}
                                            <h2 className="login-tab">login</h2>
                                        </Panel>
                                        <Panel id="signup">
                                            {/* <h2 className="signup-tab">{texts[language].signUp}</h2> */}
                                            <h2 className="signup-tab">signUp</h2>
                                        </Panel>
                                    </div>

                                    <FormPanel isActive="login">
                                        <Login pageIn="between-rounds" />
                                    </FormPanel>

                                    <FormPanel isActive="signup">
                                        <SignUp language={language} />
                                    </FormPanel>
                                {/* </MyProvider> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        : (
            <div className="user-form">
                <button
                    type="button"
                    className="navbar-btn"
                    data-toggle="modal"
                    data-target="#register"
                >
                    Regístrate / loguéate y ve a la Ronda 2
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
                                {/* <h5 className="modal-title" id="register">Welcome, keep playing!</h5> */}
                                <button
                                    type="button"
                                    className="close modalClosingButton"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" />
                            <div className="form-wrap">
                                {/* <MyProvider> */}
                                    <div className="tabs">
                                        <Panel id="login">
                                            {/* <h2 className="login-tab">{texts[language].login}</h2> */}
                                            Log in
                                        </Panel>
                                        <Panel id="signup">
                                            {/* <h2 className="signup-tab">{texts[language].signUp}</h2> */}
                                            Sign up
                                        </Panel>
                                    </div>

                                    <FormPanel isActive="login">
                                        <Login pageIn="between-rounds" gameIn={gameIn} score={score} />
                                    </FormPanel>

                                    <FormPanel isActive="signup">
                                        <SignUp language={language} score={score} />
                                    </FormPanel>
                                {/* </MyProvider> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
);

export default UserForm;

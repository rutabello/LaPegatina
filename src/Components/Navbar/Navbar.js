/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import './Navbar.css';

import homebtn from '../../Pictures/home45.png';
import catalan from '../../Pictures/bandera_catalan_small.png';
import spanish from '../../Pictures/bandera_spanish_small.png';
import english from '../../Pictures/bandera_english_small.png';
import french from '../../Pictures/bandera_french_small.png';

import userbtn from '../../Pictures/user.png';

const languagesAvailable = [
    { language: 'catalan', flag: catalan },
    { language: 'spanish', flag: spanish },
    { language: 'english', flag: english },
    { language: 'french', flag: french },
];


class Navbar extends React.Component {

    state = {
        selectedFlag: spanish,

    }

    setLanguage = (lang, flag) => {

        const { onChangeLanguage } = this.props;

        this.setState({
            selectedFlag: flag,
        });

        // Notify the parent that the language has been updated
        onChangeLanguage(lang);
    }


    render() {
        const { selectedFlag } = this.state;

        const { pagein, language, addedClass } = this.props;


        const navbarClass = (pagein === 'game')
            ? 'transparent-navbar'
            : 'color-navbar';

        return (
            <nav className={`${navbarClass} ${addedClass}`} id="topnavbar">
                <div>
                    {pagein === 'home'
                        ? <div />
                        : (
                            <Link className="backToStart" to="/">
                                <img src={homebtn} alt="home button" />
                            </Link>
                        )}
                </div>
                <div>
                    {pagein !== 'home'
                        ? <div />
                        : (
                            <div className="language-dropdown">
                                <button
                                    type="button"
                                    className="dropbtn"
                                >
                                    <img src={selectedFlag} alt="language flag" />
                                </button>

                                <div className="dropdown-content">
                                    {languagesAvailable.map((lang) => (
                                        <img
                                            key={lang.language}
                                            src={lang.flag}
                                            onClick={() => this.setLanguage(lang.language, lang.flag)}
                                            alt={lang.language}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
                <div className="space" />
                <div>
                    {pagein === 'game'
                        ? <div />
                        : (
                            <div className="profile">
                                <div>
                                    <Link className="user-profile" to="/user">
                                        <img src={userbtn} alt="user profile" />
                                    </Link>
                                </div>
                                <div className="nav-username">
                                    <MyContext.Consumer>
                                        {(context) => (
                                            context.state.name
                                                ? (
                                                    <p>
                                                        {context.state.username}
                                                        {' '}
                                                        <br />
                                                        {context.state.points}
                                                        {' '}
                                                        puntos
                                                    </p>
                                                )
                                                : <UserForm mainpage="navbar" language={language} />
                                        )}
                                    </MyContext.Consumer>
                                </div>
                            </div>
                        )}
                </div>
            </nav>
        );
    }
}

export default Navbar;

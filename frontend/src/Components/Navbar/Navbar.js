/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import texts from '../../texts.json';
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
        selectedFlag: localStorage.flag || spanish,
        userLanguage: localStorage.language || 'spanish',
    }


    setLanguage = (lang, flag) => {

        const { onChangeLanguage } = this.props;

        this.setState({
            selectedFlag: flag,
            userLanguage: `${lang}`,
        });

        localStorage.setItem('flag', flag);

        // Notify the parent that the language has been updated
        onChangeLanguage(lang, flag);
    }


    render() {
        const { selectedFlag, userLanguage } = this.state;

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
                                <div className="user-dropdown">
                                    <button type="button" className="user-dropdown-btn" style={{ float: 'right' }}>
                                        <div className="picture-points">
                                            <div className="user-profile">
                                                <img src={userbtn} alt="user profile" />
                                            </div>
                                            <div className="nav-username">
                                                <MyContext.Consumer>
                                                    {(context) => (
                                                        context.state.username
                                                            ? (
                                                                <div className="user-points">
                                                                     <p>
                                                                        {context.state.username}
                                                                        {' '}
                                                                    </p>
                                                                    <p>
                                                                        {context.state.total_app_points || 0}
                                                                        {' '}
                                                                        {texts[userLanguage].pointsText}
                                                                    </p>
                                                                </div>
                                                            )
                                                            : <UserForm mainpage="navbar" language={language} />
                                                    )}
                                                </MyContext.Consumer>
                                            </div>
                                        </div>
                                    </button>
                                    <div className="user-dropdown-content">
                                        <MyContext.Consumer>
                                            {(context) => (
                                                <div>
                                                    <Link to="/user">{texts[userLanguage].profileButton}</Link>
                                                    <a onClick={() => { context.clearUser(); console.log('clicked'); }}>{texts[userLanguage].logOutButton}</a>
                                                </div>
                                            )}
                                        </MyContext.Consumer>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </nav>
        );
    }
}

export default Navbar;

/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import '../Youtube.css';
// import { Link } from 'react-router-dom';
import Register from '../../Register/Register';
import YTGame from '../YTGame/YTGame';
import { MyContext } from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Navbar from '../../Navbar/Navbar';

class YoutubeRoundOne extends Component {

    state= {
        gameStatus: 'playing',
        // name: null,
    }

    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver' });
    }

    restartYoutube = () => {
        this.setState({
            gameStatus: 'playing',
        });
    }

    render() {

        const { gameStatus } = this.state;

        const { language } = this.props;



        if (gameStatus === 'playing') {
            return (
                <div>
                    <YTGame language={language} stopPlaying={this.stopPlaying} />
                </div>
            );
        }

        if (gameStatus === 'gameOver') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <Navbar addedClass="fixTop" />
                            <div className="instagram-game-over youtube-game-over">
                                <h3>{`Has hecho ${localStorage.yt_points_1} puntos`}</h3>
                                {/* <button className='navbar-btn' onClick={this.restartYoutube}>Vuelve a jugar</button> */}
                                {context.state.username
                                    ? <Register language={language} currentGame="youtube" roundIn= 'one'/>
                                    /* <Link to="youtuberoundtwo"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(this.counter)}>Juega una segunda ronda</button></Link> */
                                    : <UserForm language={language} />}
                            </div>
                            <div className="social-media-follow-buttons">
                                <SocialMedia
                                    language={language}
                                />
                            </div>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
        return null;
    }
}

export default YoutubeRoundOne;

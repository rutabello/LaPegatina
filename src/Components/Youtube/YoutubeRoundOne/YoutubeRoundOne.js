/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import '../Youtube.css';
import { Link } from 'react-router-dom';
// import Register from '../../Register/Register';
import YTGame from '../YTGame/YTGame';
import { MyContext } from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm';
import SocialMedia from '../../SocialMedia/SocialMedia';

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


    // registerUser = () => {
    //     this.setState({ name: 'Rut' });
    // }

    render() {

        const { gameStatus } = this.state;

        const { language } = this.props;

        if (gameStatus === 'playing') {
            return (
                <div>
                    {/* <p>Sandra's YouTube Round One component will go here</p> */}
                    <YTGame language={language} stopPlaying={this.stopPlaying} />
                    {/* <button
                        type="button"
                        onClick={() => this.stopPlaying()}
                    >
                        Finish round
                    </button>
                    <button
                        type="button"
                        onClick={() => this.registerUser()}
                    >
                        Register user
                    </button> */}
                </div>
            );
        }

        if (gameStatus === 'gameOver') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <h1>Has llegado al final de esta ronda. Te atreves con la segunda?</h1>
                            <button type="button" className="navbar-btn" onClick={this.restartYoutube}>Vuelve a jugar</button>
                            {context.state.name
                                ? <Link to="youtuberoundtwo"><button className="navbar-btn" type="button" onClick={() => context.addPoints(this.counter)}>Juega una segunda ronda</button></Link>
                                : <UserForm language={language} />}
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

//         if (gameStatus === 'gameOver') {
//             if (name !== null) {
//                 return (
//                     <div>
//                         <Link to="youtuberoundtwo">Link to YouTube's 2nd round</Link>
//                     </div>
//                 );
//             }

//             return (
//                 <Register currentGame="youtube" />
//             );
//         }

//         return null;
//     }
// }


export default YoutubeRoundOne;

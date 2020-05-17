/* eslint-disable max-len */
import React, { Component } from 'react';
//import './Register.css';
import '../Rounds/Rounds.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';


class Register extends Component {

    state= {
        link: 'hide',
    }

    showLink = (context, newPoints, gameName, roundIn) => {

        console.log('context', context);

        context.addPoints(newPoints, gameName, roundIn);
        this.setState({
           // link: 'showIt',
           link: "screen"
        });
    }

    render() {

        const { currentGame, score } = this.props;

        const { link } = this.state;

        if (currentGame === 'spotify') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="title">Ronda 2</h1>
                                <Link to="spotifyRoundTwo"><button className="button1" type="button">Start</button></Link>
                            </div>
                            <button type="button" onClick={() => this.showLink(context, score, 'spotify', 'one')}>Suma puntos y sigue jugando</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'spotify1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith title">Ronda 1</h1>
                                <Link to="spotifyroundone"><button className="button1" type="button" onClick={() => context.addPoints(score)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega con Música</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'youtube') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 2</h1>
                                <p>Instrucciones</p>
                                <Link to="youtuberoundone"><button className="button1" type="button" onClick={() => context.addPoints(score)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega una segunda ronda</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'youtube1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 1</h1>
                                <p>Instrucciones</p>
                                <Link to="youtuberoundone"><button className="button1" type="button" onClick={() => context.addPoints(score)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega con Videos</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'instagram') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 2</h1>
                                <Link to="instagramroundtwo"><button className="button1" type="button" onClick={() => context.addPoints(score)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega una segunda Ronda</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'instagram1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith">Ronda 1</h1>
                                <Link to="instagramroundone"><button className="button1" type="button" onClick={() => context.addPoints(score)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega con Fotos</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
        return null;
    }
}

export default Register;

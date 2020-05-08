/* eslint-disable max-len */
import React, { Component } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';


class Register extends Component {

    state= {
        link: 'hide',
    }

    showLink = () => {

        this.setState({
            link: 'showIt',
        });
    }

    render() {

        const { currentGame } = this.props;

        const { link } = this.state;

        if (currentGame === 'spotify') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <h1 className="playWith title">Ronda 2</h1>
                                <Link to="spotifyRoundTwo"><button className="btn btn-primary" type="button" onClick={() => context.addPoints(this.counter)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Suma puntos y sigue jugando</button>
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
                                <Link to="youtuberoundtwo"><button className="navbar-btn" type="button" onClick={() => context.addPoints(this.counter)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega una segunda ronda</button>
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
                                <Link to="instagramroundtwo"><button className="navbar-btn" type="button" onClick={() => context.addPoints(this.counter)}>Start</button></Link>
                            </div>
                            <button type="button" onClick={this.showLink}>Juega una segunda Ronda</button>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
        return null;
    }
}

export default Register;

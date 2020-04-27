import React, { Component } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
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
                <div>

                    <div className={link}>
                        <h1 className="playWith title">Ronda 2</h1>
                        <Link className="playWith" to="spotifyRoundTwo">Start</Link>
                    </div>
                    <button type="button" onClick={this.showLink}>Send and go to spotify Second Round</button>
                </div>
            );
        }

        if (currentGame === 'youtube') {
            return (
                <div>
                    <div className={link}>
                        <h1 className="playWith">Ronda 2</h1>
                        <Link to="youtubeRoundTwo">Start</Link>
                    </div>
                    <button type="button" onClick={this.showLink}>Send and go to Youtube Second Round</button>
                </div>
            );
        }

        if (currentGame === 'instagram') {
            return (
                <div>
                    <div className={link}>
                        <h1 className="playWith">Eso es ronda 2</h1>
                        <Link to="instagramRoundTwo">Start</Link>
                    </div>
                    <button type="button" onClick={this.showLink}>Send and go to Instagram Second Round</button>
                </div>
            );
        }
        return null;
    }
}

export default Register;

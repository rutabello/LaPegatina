import React, { Component } from 'react';
import './GameEnded.css';
import { Link } from 'react-router-dom';

class GameEnded extends Component {

    state= {

    }

    render() {

        const { currentGame } = this.props;

        if (currentGame === 'spotify') {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="instagramroundone">Instagram</Link>
                    <br />
                    <Link to="youtuberoundone">YouTube</Link>
                </div>
            );
        }

        if (currentGame === 'youtube') {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="spotifyroundone">Spotify</Link>
                    <br />
                    <Link to="instagramroundone">Instagram</Link>
                </div>
            );
        }

        if (currentGame === 'instagram') {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="spotifyroundone">Spotify</Link>
                    <br />
                    <Link to="youtuberoundone">YouTube</Link>
                </div>
            );
        }
        return null;
    }
}

export default GameEnded;

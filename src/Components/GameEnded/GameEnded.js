import React, {Component} from 'react';
import './GameEnded.css';
import {Link} from 'react-router-dom';

class GameEnded extends Component {

    state= {

    }

    render () {
        return (
            <div>
                <p>This game ends here. You can now play with</p>
                <Link to="game">Spotify</Link>
                <Link to="instagramroundone">Instagram</Link>
                <Link to="youtuberoundone">YouTube</Link>
            </div>
        )
    }

}

export default GameEnded;
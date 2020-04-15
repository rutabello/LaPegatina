import React, {Component} from 'react';
import './GameEnded.css';
import {Link} from 'react-router-dom';

class GameEnded extends Component {

    state= {

    }

    render () {
        if (this.props.currentGame === "spotify") {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="instagramroundone">Instagram</Link>
                    <br />
                    <Link to="youtuberoundone">YouTube</Link>
                </div>
            )
        } else if (this.props.currentGame === "youtube") {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="spotifyroundone">Spotify</Link>
                    <br />
                    <Link to="instagramroundone">Instagram</Link>
                </div>
            )
        } else if (this.props.currentGame === "instagram") {
            return (
                <div>
                    <p>This game ends here. You can now play with</p>
                    <br />
                    <Link to="spotifyroundone">Spotify</Link>
                    <br />
                    <Link to="youtuberoundone">YouTube</Link>
                </div>
            )
        }
    }
}

export default GameEnded;
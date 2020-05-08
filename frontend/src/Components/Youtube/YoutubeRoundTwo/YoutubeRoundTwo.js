import React, { Component } from 'react';
import '../Youtube.css';
import GameEnded from '../../GameEnded/GameEnded';

class YoutubeRoundTwo extends Component {

    state= {

    }

    render() {
        return (
            <div>
                <p>YouTube second round component will go here</p>
                <GameEnded currentGame="youtube" />
            </div>
        );
    }

}

export default YoutubeRoundTwo;

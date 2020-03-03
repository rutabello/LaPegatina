import React from 'react';
import './ReplayButton.css';
import Sound from 'react-sound';

const ReplayButton = (props) => {

    return (
        <div>
            <ul>
                {this.props.unknownSongs.map((song) => {
                    return (
                        <div className="list">
                            <li>
                                {song} 
                                <button onClick={this.props.state.playing ? () => this.props.stopMusic() : () => this.props.getSongUrl(song)}>{this.props.state.playing ? "Pause" : "Listen again"} 
                                </button> 
                            </li>
                        </div>
                    )
                })}
            </ul>
            <Sound 
                url={this.props.state.url}
                playStatus={this.props.playStatus}
            />
        </div>
    )
};


export default ReplayButton;
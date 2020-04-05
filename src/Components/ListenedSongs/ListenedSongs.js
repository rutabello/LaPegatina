import React, {Component} from 'react';
import Sound from 'react-sound';
import texts from '../../texts.json';
import './ListenedSongs.css';


class ListenedSongs extends Component {

    render () {

        return (
            this.props.unknownSongs ? 
            <div>
                <h4 className="instruct">{texts[this.props.language].listenedSongs}</h4>
                <ul id="mistakes" className="instruct">  
                    {this.props.unknownSongs.map((song) => {
                    const url= song.uri
                    return (
                        <li key={song.uri} className="mistake-list">
                            <div className="song-name">
                            {song.name} 
                            </div>
                            <a href={url}>{song.uri}</a>
                            <button className="repeat-button" onClick={this.props.onClick ? () => this.props.stopMusic() : () => this.props.getSongUrl(song)}>
                            {this.props.onClick ? texts[this.props.language].pauseText : texts[this.props.language].listenAgain} 
                            </button> 
                        </li>
                    )
                    })}
                </ul>
                <Sound 
                    url={this.props.songUrl}
                    playStatus={this.props.playerState}
                    autoLoad={this.props.autoLoad}
                />
            </div>
            : <p>No songs</p>
        )
    }
};

export default ListenedSongs;



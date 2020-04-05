import React, {Component} from 'react';
// import Sound from 'react-sound';
import texts from '../../texts.json';
import './ListenedSongs.css';

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  
  import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";


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


                            {/* <-- Button trigger modal --> */}
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            {texts[this.props.language].shareTheSongButton}
                            </button>

                            {/* <-- Modal --> */}
                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">{texts[this.props.language].whereToShareText}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <EmailShareButton 
                                    url={song.uri} 
                                    title={texts[this.props.language].songShareText}
                                    className="Demo_some-network__share-button"
                                    >
                                    <EmailIcon size={50} round />
                                    </EmailShareButton>

                                    <FacebookShareButton 
                                    url={song.uri} 
                                    title={texts[this.props.language].songSharedText}
                                    className="Demo_some-network__share-button"
                                    >
                                    <FacebookIcon size={50} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                    url={song.uri}
                                    title={texts[this.props.language].songSharedText}
                                    className="Demo_some-network__share-button"
                                    >
                                    <TwitterIcon size={50} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton 
                                    url={song.uri} 
                                    title={texts[this.props.language].songSharedText}
                                    className="Demo_some-network__share-button"
                                    >
                                    <WhatsappIcon size={50} round />
                                    </WhatsappShareButton>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">{texts[this.props.language].doneText}</button>
                                </div>
                                </div>
                            </div>
                            </div>



                            {/* <button className="repeat-button" onClick={this.props.onClick ? () => this.props.stopMusic() : () => this.props.getSongUrl(song)}>
                            {this.props.onClick ? texts[this.props.language].pauseText : texts[this.props.language].listenAgain} 
                            </button>  */}
                        </li>
                    )
                    })}
                </ul>
                {/* <Sound 
                    url={this.props.songUrl}
                    playStatus={this.props.playerState}
                    autoLoad={this.props.autoLoad}
                /> */}
            </div>
            : <p>No songs</p>
        )
    }
};

export default ListenedSongs;



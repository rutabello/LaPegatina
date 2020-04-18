import React from 'react';
import { Link } from 'react-router-dom';
import { EmailShareButton, FacebookShareButton,
    TwitterShareButton, WhatsappShareButton, EmailIcon,
    FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
// import Sound from 'react-sound';
import texts from '../../../texts.json';
import './ListenedSongs.css';
import { MyContext } from '../../../context/MyProvider'
import Register from '../../Register/Register';

const ListenedSongs = ({ name, language, unknownSongs,score }) => (
  
    <MyContext.Consumer>
{(context)=>(
    <div>
    <button onClick= {()=>context.addPoints(score)}>Add the score </button>
        <h4 className="instruct">{texts[language].listenedSongs}</h4>
        <ul id="mistakes" className="instruct">
            {unknownSongs.map((song) => {
                const url = song.uri.replace(/:/g, '/').replace('spotify', 'https://open.spotify.com');
                return (
                    <li key={song.uri} className="mistake-list">
                        <div className="song-name">
                            {song.name}
                        </div>

                        {/* <-- Button trigger modal --> */}
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            {texts[language].shareTheSongButton}
                        </button>

                        {/* <-- Modal --> */}
                        <div
                            className="modal fade"
                            id="exampleModalCenter"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalCenterTitle">{texts[language].whereToShareText}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <EmailShareButton
                                            url={url}
                                            title={texts[language].songShareText}
                                            className="Demo_some-network__share-button"
                                        >
                                            <EmailIcon
                                                size={45}
                                                round
                                            />
                                        </EmailShareButton>

                                        <FacebookShareButton
                                            url={url}
                                            title={texts[language].songSharedText}
                                            className="Demo_some-network__share-button"
                                        >
                                            <FacebookIcon
                                                size={45}
                                                round
                                            />
                                        </FacebookShareButton>

                                        <TwitterShareButton
                                            url={url}
                                            title={texts[language].songSharedText}
                                            className="Demo_some-network__share-button"
                                        >
                                            <TwitterIcon
                                                size={45}
                                                round
                                            />
                                        </TwitterShareButton>

                                        <WhatsappShareButton
                                            url={url}
                                            title={texts[language].songSharedText}
                                            className="Demo_some-network__share-button"
                                        >
                                            <WhatsappIcon
                                                size={45}
                                                round
                                            />
                                        </WhatsappShareButton>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">
                                            {texts[language].doneText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <button className="repeat-button" onClick={this.props.onClick ? () => this.props.stopMusic()
                        : () => this.props.getSongUrl(song)}>
                        {this.props.onClick ? texts[this.props.language].pauseText : texts[this.props.language].listenAgain}
                        </button>  */}
                    </li>
                );
            })}
        </ul>
        {name !== undefined
            ? <Link to="spotifyRoundTwo">Go to Spotify round two</Link>
            : <Register currentGame="spotify" />}
    </div>
)}
   </MyContext.Consumer>
);

export default ListenedSongs;

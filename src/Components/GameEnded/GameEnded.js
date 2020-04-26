/* eslint-disable max-len */
import React from 'react';
import './GameEnded.css';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';
import SocialMedia from '../SocialMedia/SocialMedia';

const GameEnded = ({ currentGame, language, changeBandMember, points }) => (
    <div>
        <MyContext.Consumer>
            {(context) => {
                if (currentGame === 'spotify') {
                    return (
                        <div>
                            <p>{texts[language].gameEnded}</p>
                            <br />
                            <Link to="instagramroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Fotos</button></Link>
                            <br />
                            <Link to="youtuberoundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Vídeos</button></Link>
                        </div>
                    );
                }

                if (currentGame === 'youtube') {
                    return (
                        <div>
                            <p>This game ends here. You can now play with</p>
                            <br />
                            <Link to="spotifyroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Música</button></Link>
                            <br />
                            <Link to="instagramroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Fotos</button></Link>
                        </div>
                    );
                }

                if (currentGame === 'instagram') {
                    return (
                        <div>
                            <p>
                                `Sumamos
                                {' '}
                                {points}
                                {' '}
                                puntos a tu perfil. Ahora puedes seguir jugando con`
                            </p>
                            <br />
                            <Link to="spotifyroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Música</button></Link>
                            <br />
                            <Link to="youtuberoundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>Vídeos</button></Link>
                            <br />
                            {/* <Link to="instagramroundtwo">{texts[language].changeBandMember}</Link> */}
                            <button className="navbar-btn" onClick={changeBandMember} type="button">{texts[language].changeBandMember}</button>
                        </div>
                    );
                }
                return null;
            }}
        </MyContext.Consumer>
        <div className="social-media-follow-buttons">
            <SocialMedia
                language={language}
            />
        </div>
    </div>
);


export default GameEnded;

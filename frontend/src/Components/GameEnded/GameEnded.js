/* eslint-disable max-len */
import React from 'react';
import './GameEnded.css';
//import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';
import SocialMedia from '../SocialMedia/SocialMedia';
import Register from '../Register/Register';

const GameEnded = ({ score, currentGame, language, changeBandMember, points }) => (
    <div>
         <MyContext.Consumer>
            {(context) => {
                if (currentGame === 'spotify') {
                    return (
                        <div>
                            <p>{texts[language].gameEnded}</p>
                            <br />
                             <Register score={score} currentGame="instagram1"/>
                            {/*<Link to="instagramroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].photosText}</button></Link>*/}
                            <br />
                            <Register score={score} currentGame="youtube1"/>
                           {/*<Link to="youtuberoundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].videosText}</button></Link>*/}
                        </div>
                    );
                }

                if (currentGame === 'youtube') {
                    return (
                        <div>
                            <p>{texts[language].gameEnded}</p>
                            <br />
                            <Register score={score} currentGame="spotify1"/>
                           { /*<Link to="spotifyroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].musicText}</button></Link>*/}
                            <br />
                            <Register score={score} currentGame="instagram1"/>
                            {/*<Link to="instagramroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].photosText}</button></Link>*/}
                        </div>
                    );
                }

                if (currentGame === 'instagram') {
                    return (
                        <div>
                            <p>
                                Sumamos
                                {' '}
                                {points}
                                {' '}
                                puntos a tu perfil. Ahora puedes seguir jugando con
                            </p>
                            <br />
                            <Register score={score} currentGame="spotify1"/>
                            {/*<Link to="spotifyroundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].musicText}</button></Link>*/}
                            <br />
                           {/* <Link to="youtuberoundone"><button className="navbar-btn" type="button" onClick={() => context.addPoints(points)}>{texts[language].videosText}</button></Link>*/}
                            <br />
                            <Register score={score} currentGame="youtube1"/>
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

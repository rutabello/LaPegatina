/* eslint-disable max-len */
import React, { useEffect, useContext } from 'react';
import './GameEnded.css';
//import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';
import { Link } from 'react-router-dom';
import SocialMedia from '../SocialMedia/SocialMedia';
import Register from '../Register/Register';


const GameEnded = ({ score, currentGame, language, changeBandMember, points }) => {

    // const { addPoints } = useContext(MyContext);

    // useEffect(() => {
    //     addPoints(score, currentGame, 'two')
    // }, [])

    const { addPoints, points_spotify_round_two } = useContext(MyContext);

    const addPointsToContext = () => {
        console.log('score i current game', score, currentGame)
        addPoints(score, currentGame, 'two')
    }

    return (
        <div>
            <MyContext.Consumer>
                {(context) => {
                    if (currentGame === 'spotify') {
                        return (
                            <div>
                                <p>{texts[language].gameEnded}</p>
                                <p>{`Has hecho ${score} puntos, y tu récord es de ${points_spotify_round_two}, así que`}</p>
                                <Link to="/"><button type="button" onClick={addPointsToContext}>Suma puntos al perfil y sigue jugando</button></Link>
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

    )
};


export default GameEnded;

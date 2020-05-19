/* eslint-disable max-len */
import React, { useEffect, useContext } from 'react';
import './GameEnded.css';
//import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';
import { Link } from 'react-router-dom';
import SocialMedia from '../SocialMedia/SocialMedia';
import Register from '../Register/Register';


const GameEnded = ({ score, currentGame, language, points }) => {


    const { addPoints } = useContext(MyContext);

    const addPointsToContext = () => {
        console.log('score i current game', score, currentGame)

        addPoints(score || points, currentGame, 'two')
    }

    return (
        <div>
            <MyContext.Consumer>
                {(context) => {
                    if (currentGame === 'spotify') {
                        return (
                            <div className="game-ended-container">
                                <h1>{texts[language].score.replace('%points', score)}</h1>
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToContext}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }

                    if (currentGame === 'youtube') {
                        return (
                            <div className="game-ended-container">
                                {/* <h1>{texts[language].score.replace('%points', points)}</h1> */}
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToContext}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }

                    if (currentGame === 'instagram') {
                        return (

                            <div className="game-ended-container">
                                <h1>{texts[language].score.replace('%points', points)}</h1>
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToContext}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }
                    return null;
                }}
            </MyContext.Consumer>
            {/* <div className="social-media-follow-buttons">
                <SocialMedia
                    language={language}
                />
            </div> */}
        </div>

    )
};


export default GameEnded;

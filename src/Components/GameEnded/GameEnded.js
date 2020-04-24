/* eslint-disable max-len */
import React from 'react';
import './GameEnded.css';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';

const GameEnded = ({ currentGame, language, changeBandMember, points }) => (

    <MyContext.Consumer>
        {(context) => {
            if (currentGame === 'spotify') {
                return (
                    <div>
                        <p>{texts[language].gameEnded}</p>
                        <br />
                        <Link to="instagramroundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>Instagram</button></Link>
                        <br />
                        <Link to="youtuberoundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>YouTube</button></Link>
                    </div>
                );
            }

            if (currentGame === 'youtube') {
                return (
                    <div>
                        <p>This game ends here. You can now play with</p>
                        <br />
                        <Link to="spotifyroundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>Spotify</button></Link>
                        <br />
                        <Link to="instagramroundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>Instagram</button></Link>
                    </div>
                );
            }

            if (currentGame === 'instagram') {
                return (
                    <div>
                        <p>This game ends here. You can now play with</p>
                        <br />
                        <Link to="spotifyroundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>Spotify</button></Link>
                        <br />
                        <Link to="youtuberoundone"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(points)}>YouTube</button></Link>
                        <br />
                        {/* <Link to="instagramroundtwo">{texts[language].changeBandMember}</Link> */}
                        <button onClick={changeBandMember} type="button">{texts[language].changeBandMember}</button>
                    </div>
                );
            }
            return null;
        }}
    </MyContext.Consumer>
);


export default GameEnded;

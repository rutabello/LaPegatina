import React from 'react';
import {Link} from 'react-router-dom';
import texts from '../../Components/texts.json'

import facebook from './icons/icon_2019_Facebook.svg';
import twitter from './icons/icon_2019_Twitter.svg';
import instagram from './icons/icon_2019_Instagram.svg';
import youtube from './icons/icon_2019_YouTube.svg';
import spotify from './icons/icon_2019_Spotify.svg';
import tiktok from './icons/icon_2019_TikTok.png';

const SocialMedia = (props) => {
    return (
        <div className="peu_xarxessocials">
            <p>{texts[props.language].followUs}</p>
            <nav>
                <ul>
                    <li> <a href="https://www.facebook.com/lapegatina?ref=ts" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={facebook} alt="facebook"></img></a></li>
                    <li> <a href="https://twitter.com/lapegatina" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={twitter} alt="twitter"></img></a></li>
                    <li> <a href="https://instagram.com/lapegatina" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={instagram} alt="instagram"></img></a></li>
                    <li> <a href="https://www.youtube.com/lapegatinatv" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={youtube} alt="youtube"></img></a></li>
                    <li> <a href="https://open.spotify.com/artist/4xvB67czbtvemGVXGa81oK" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={spotify} alt="youtube"></img></a></li>
                    <li> <a href="https://www.tiktok.com/@lapegatina" target="_blank" rel='noreferrer noopener'><img className="social-icon" src={tiktok} alt="tiktok"></img></a></li>
                </ul>
            </nav>
            <Link to="/team"><p className="made-by no-text-decoration">{texts[props.language].madeWithText} <span>❤</span>{texts[props.language].byText}</p></Link>
        </div>
    )
};


export default SocialMedia;









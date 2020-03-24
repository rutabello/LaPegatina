import React from 'react';
// import './SocialMedia.css';

import facebook from './icons/icon_2019_Facebook.svg';
import twitter from './icons/icon_2019_Twitter.svg';
import instagram from './icons/icon_2019_Instagram.svg';
import youtube from './icons/icon_2019_YouTube.svg';
import spotify from './icons/icon_2019_Spotify.svg';
import tiktok from './icons/icon_2019_TikTok.png';

const SocialMedia = () => {
    return (
        <div className="peu_xarxessocials">
            <p>Síguenos en ...</p>
            <nav>
                <ul>
                    <li> <a href="https://www.facebook.com/lapegatina?ref=ts" target="_blank"><img className="social-icon" src={facebook} alt="facebook"></img></a></li>
                    <li> <a href="https://twitter.com/lapegatina" target="_blank"><img className="social-icon" src={twitter} alt="twitter"></img></a></li>
                    <li> <a href="https://instagram.com/lapegatina" target="_blank"><img className="social-icon" src={instagram} alt="instagram"></img></a></li>
                    <li> <a href="https://www.youtube.com/lapegatinatv" target="_blank"><img className="social-icon" src={youtube} alt="youtube"></img></a></li>
                    <li> <a href="https://open.spotify.com/artist/4xvB67czbtvemGVXGa81oK" target="_blank"><img className="social-icon" src={spotify} alt="youtube"></img></a></li>
                    <li> <a href="https://www.tiktok.com/@lapegatina" target="_blank"><img className="social-icon" src={tiktok} alt="tiktok"></img></a></li>
                </ul>
            </nav>
        </div>
    )
};


export default SocialMedia;









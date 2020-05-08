import React from 'react';

import { EmailShareButton, FacebookShareButton,
    TwitterShareButton, WhatsappShareButton, EmailIcon,
    FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';


import './ShareTheGame.css';

import sharebtn from '../../Pictures/noun_Share_89624.png';

const shareurl = 'https://juegaconlapegatinaenpruebas.netlify.com';


const ShareTheGame = (props) => {

    const { score } = props;

    return (
        <div id="media-share-buttons">
            <div className="arrow">
                <img src={sharebtn} alt="share icon" />
            </div>

            <div className="share-buttons">
                <EmailShareButton
                    url={shareurl}
                    title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
                    className="Demo_some-network__share-button"
                >
                    <EmailIcon
                        size={45}
                        round
                    />
                </EmailShareButton>

                <FacebookShareButton
                    url={shareurl}
                    title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
                    className="Demo_some-network__share-button"
                >
                    <FacebookIcon
                        size={45}
                        round
                    />
                </FacebookShareButton>

                <TwitterShareButton
                    url={shareurl}
                    title={`He jugado con las canciones de @LaPegatina y he hecho ${score} puntos. ¿Me superas?`}
                    className="Demo_some-network__share-button"
                >
                    <TwitterIcon
                        size={45}
                        round
                    />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={shareurl}
                    title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
                    className="Demo_some-network__share-button"
                >
                    <WhatsappIcon size={45} round />
                </WhatsappShareButton>
            </div>
        </div>
    );
};

export default ShareTheGame;

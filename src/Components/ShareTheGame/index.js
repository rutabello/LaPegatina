import React from 'react';
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

import '../Game/Game.css';
// import arrow from '../../Pictures/arrow_left.svg';
import sharebtn from '../../Pictures/noun_Share_89624.png';

const shareurl =  "https://juegaconlapegatinaenpruebas.netlify.com";


const shareTheGame = (props) => {

  const { score } = props;

  return (
    <div id="media-share-buttons">
      
      <div className="arrow">
        {/* TODO: change this for share icon */}
        <img src={sharebtn} alt=""/>
      </div>

      <div className="share-buttons">
        <EmailShareButton 
        url={shareurl} 
        title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
        className="Demo_some-network__share-button"
        >
          <EmailIcon size={50} round />
        </EmailShareButton>

        <FacebookShareButton 
          url={shareurl} 
          title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
          className="Demo_some-network__share-button"
        >
          <FacebookIcon size={50} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareurl}
          title={`He jugado con las canciones de @LaPegatina y he hecho ${score} puntos. ¿Me superas?`}
          className="Demo_some-network__share-button"
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>

        <WhatsappShareButton 
          url={shareurl} 
          title={`He jugado con las canciones de La Pegatina y he hecho ${score} puntos. ¿Me superas?`}
          className="Demo_some-network__share-button"
        >
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
      </div>
    </div>
  )
}

export default shareTheGame;

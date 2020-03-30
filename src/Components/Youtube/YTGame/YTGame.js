import React from 'react';
import YTPlayer from '../YTPlayer/YTPlayer';
import '../YTGame/YTGame.css';

function YTGame() {
  return (
    <div>
    <div className="yt-player">
      <YTPlayer  videoId= 'NFSyl3pwa-A' />
      
    </div>
    </div>
  )
}

export default YTGame
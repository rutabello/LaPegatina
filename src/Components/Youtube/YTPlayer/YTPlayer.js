import React, { Component } from 'react';
import YouTube from 'react-youtube';//npm package

class YTPlayer extends Component {
  state ={
    data : {}
  }

  VideoOnReady=(event)=>{
    let player = event.target;
    // console.log (event.target)
    // console.log (event.target.playerInfo)
    // access to player in all event handlers via event.target
    player.playVideo();
    player.seekTo(10)//plays the video at 10s, in case the video has the name of the song at the start
    // console.log (player.playerInfo.videoData.title)
    //that prints in console the name of the song
    this.setState({
      data :{
        info: player.playerInfo.videoData.title, //stored the title into a const
        toString : () => {
          return 'data'
        } 
      }
    })
}


VideoOnPlay=(event)=>{
    // access to player in all event handlers via event.target
    const player = event.target
    // console.log(player)
    alert(player.playerInfo.videoData.title)
    }

   
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding: 1,//not big yt branding
        controls: 0,//the control not displayed
        mute: 1,// this mutes automaticly the video(in combination with the hidden control, the user can't unmute)
        loop:1,
        rel: 0 //getting only related videos from the channel
      }
    
    };
    // console.log(opts)
    const { videoId } = this.props;
    return (
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.VideoOnReady}
          onPlay={this.VideoOnPlay}
          // onPause={this.VideoOnPlay}
        />
      <p>Song Title: {this.state.data.info}</p>
      </div>
    );

  }
}


export default YTPlayer;

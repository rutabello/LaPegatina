import React, { Component } from 'react';
import '../Youtube.css';
import GameEnded from '../../GameEnded/GameEnded';
import YTPlayer from '../YTPlayer/YTPlayer';
import videoDataObject from '../VideoDataObject'

class YoutubeRoundTwo extends Component {
 

        state= {
            gameStatus: 'playing',
            data: [],
            videoId: '',
            // displayPlayer: false
            // name: null,
        }
    componentDidMount = () => {
        const json = JSON.stringify(videoDataObject);
        const newdata = JSON.parse(json);

        this.setState({
            data: newdata,
        });
// console.log (this.state.data)
// console.log (newdata)
       const arrayPlaylist = [];
       newdata.map((element) => {
       // here be the if statement
           arrayPlaylist.push(element.videoId);
           return arrayPlaylist;
       });
       this.setState({
        //    questions: newdata[arrayPlaylist.indexOf(arrayPlaylist.videoId)].questions,
        //    currentTitle: newdata[arrayPlaylist.indexOf(randomVideoId)].title,
           // currentSongTitle:
       });
    }
    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver' });
    }
    
        restartYoutube = () => {
            this.setState({
                gameStatus: 'playing',
            });
        }
        renderPlayer = () => {
            const { data } = this.state;
            return data.map( (item, index) =>
               <YTPlayer
                   key={index}
                   type={item.videoId}
                   data={data}
               />
            );
           }
        render() {

            const { gameStatus, data } = this.state;
    
            const { language } = this.props;
    
            if (gameStatus === 'playing') {
                return (
                    <div>
                    <p>Con que concerto de La Pegatina quieres jugar?</p>
                    <div className="btn-concert">
                    
                    {data.map((name) => (
                        <button
                            className="btn-nav"
                            type="button"
                            // key={data.title}
                            onClick={() => this.renderPlayer(name.videoId)}
                        >
                            {name.title}
                       
                        </button>
                    ))}
                    </div>
                    </div>
                    )}
            if (gameStatus === 'gameOver') {
                return (
                    <div>
                         <GameEnded currentGame="youtube" />
                    </div>
                )
            }
          }
          }

export default YoutubeRoundTwo;

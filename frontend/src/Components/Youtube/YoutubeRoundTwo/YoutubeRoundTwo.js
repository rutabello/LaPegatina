import React, { Component } from 'react';
import '../Youtube.css';
import GameEnded from '../../GameEnded/GameEnded';
import YTPlayer2 from './YTPlayer2';
import videoDataObject from '../VideoDataObject'

class YoutubeRoundTwo extends Component {
 

        state= {
            gameStatus: 'select',
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
console.log (this.state.data)
console.log (newdata)
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
    selectConcert=()=>{
       this.setState({
           gameStatus: 'playing'
       })
    }
    setSelectedMemberId = (videoId) => {

        const { setSelectedMemberId } = this.props;

        setSelectedMemberId(videoId);
    }
    
        restartYoutube = () => {
            this.setState({
                gameStatus: 'playing',
            });
        }

        render() {

            const { gameStatus, data} = this.state;
    
            const { language } = this.props;
    
          
    
            if (gameStatus === 'select') {
                return (
                    <div>
                    <p>Con que concerto de La Pegatina quieres jugar?</p>
                    <div className="btn-concert">
                    
                    {data.map((name) => (
                        <button
                            className="btn-nav"
                            type="button"
                            // key={data.title}
                            onClick={() => this.setSelectedMemberId(name.videoId)}
                        >
                            {name.title}
                       
                        </button>
                    ))}
                    </div>
                    </div>
                    )}
                    if (gameStatus === 'playing') {
                        return(
                    <div>
                        <YTPlayer2 data={data} language={language} stopPlaying={this.stopPlaying} />
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

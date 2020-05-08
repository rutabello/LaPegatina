/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import YTPlayer from '../YTPlayer/YTPlayer';
import './YTGame.css';
// import getPlayListItems from '../Api/Api';
import Shuffle from '../../Utils/Shuffle';
import videoDataObject from '../VideoDataObject';
// console.log (getPlayListItems())

class YTGame extends Component {

    state = {
        data: {},
        // oneVideoID: '',
        randomVideoId: '',
        // playlistItemsArr: [],
        // currentSongTitle: '',
        fourNonShuffledSongsTitles: [],
        questions: [],
        // answers:[],
        currentTitle: '',
    }


    componentDidMount = () => {
        const json = JSON.stringify(videoDataObject);
        const newdata = JSON.parse(json);
        // getting from the pending promise the data
        // let promise = getPlayListItems();
        // promise.then((data) => {
        //   const modifiedData = getPlayListItems(data);
        //   // save the data into the state
        // console.log(json)

        this.setState({
            data: newdata,
        });

        // this is the question

        const arrayPlaylist = [];
        // Recover the videoIDs from the data(api) and push in an array
        newdata.map((element) => {
        // here be the if statement
            arrayPlaylist.push(element.videoId);
            return arrayPlaylist;
        });

        // create the random from one videoid
        const randomVideoId = arrayPlaylist[Math.floor(Math.random() * arrayPlaylist.length)];
        this.setState({
            randomVideoId,
            questions: newdata[arrayPlaylist.indexOf(randomVideoId)].questions,
            currentTitle: newdata[arrayPlaylist.indexOf(randomVideoId)].title,
            // currentSongTitle:
        });


        // create the array with the title of the songs for the button shuffle(tu put in other buttons)
        const arraySongTitles = [];
        newdata.map((element) => {
            arraySongTitles.push(element.title);
            return arraySongTitles;
        });
        // removed from the array the title of the song that is playing so it wont dublicate in the buttons
        arraySongTitles.splice(arrayPlaylist.indexOf(randomVideoId), 1);

        // shuffle function that reorganize the order of the song title
        const suffledArraySongTitles = Shuffle(arraySongTitles);
        const fourNonShuffledSongsTitles = suffledArraySongTitles.slice(0, 3); // actually 3

        // fourNonShuffledSongsTitles.push(currentSongName); // now 4

        //  const fourShuffledSongsTitles = Shuffle(fourNonShuffledSongsTitles)
        // console.log(fourShuffledSongsTitles)
        // return fourNonShuffledSongsTitles;
        this.setState({
            fourNonShuffledSongsTitles,
        });
    }


    render() {

        const { fourNonShuffledSongsTitles, randomVideoId, data, currentTitle, questions } = this.state;

        const { language, stopPlaying } = this.props;

        return (
            <div className="yt-all">
                <div className="cover-title">
                    <span className="instuctionsYT" />
                </div>
                <div className="yt-player">
                    <YTPlayer
                        det={fourNonShuffledSongsTitles}
                        videoId={randomVideoId}
                        info={data}
                        title={currentTitle}
                        questions={questions}
                        stopPlaying={stopPlaying}
                        language={language}
                    />
                </div>
            </div>
        );
    }
}

export default YTGame;

import React, {Component} from 'react';
import Shuffle from '../../Utils/Shuffle'
import ButtonIgRoundOne from './ButtonIgRoundOne';
import texts from '../../../texts.json';
import {Link} from 'react-router-dom';
import Loading from '../../Utils/Loading/Loading';
import Register from '../../Register/Register';

import '../../Instagram/Instagram.css';

class InstagramRoundOne extends Component {

    NUMBER_OF_ATTEMPTS = 6
    oficial_number_of_attempts = this.NUMBER_OF_ATTEMPTS-1

    state = {
        randomImageSrc: "",
        randomImageTags: "",
        tagsOptions: [],
        data: [],
        gameStatus: "loading",
        userClicked: false,
    }

    attempts= 0;
    counter= 0;
    apiCleanedResult = {}
    apiResultLength = 0


   //Cleans the object retrieved from the api and leaves an array of objects that just have the image source for the picture and the image location
    cleanApiResponse = () => {
        const images = this.state.data.filter(img => img.node.edge_media_to_tagged_user.edges.length !== 0)

        const result = images.map((image) => ({
            src: image.node.thumbnail_resources[4].src,
            tags: image.node.edge_media_to_tagged_user.edges.map((edge) => edge.node.user.username)
        }))

        this.apiCleanedResult = result;

        this.apiResultLength = result.length
    }

    //Takes off the first element of the array resulting in cleanApiResponse (called result) and takes the next 3 elements
    setRandomImageAndTags = () => {

        Shuffle(this.apiCleanedResult)

        const firstElement = this.apiCleanedResult.shift();

        const imagesObjArr = this.apiCleanedResult.slice(0, 3);

        const threeTagsArr = imagesObjArr.map((imageObj) => imageObj.tags)

        threeTagsArr.push(firstElement.tags) //Cuando hacemos el push, el mismo array, con el mismo nombre, pasa de tener 3 elementos a tener 4. Si igualamos esta array a una constante, no estaríamos guardando la array de 4 elementos resultante sinó que guardaríamos el resultado del push, que sería soplo el número 4, tantos como elementos tiene dentro la array

        const threeRandomPlusCorrectTagsArr = Shuffle(threeTagsArr)

        this.setState ({
            randomImageSrc: firstElement.src,
            randomImageTags: firstElement.tags.map((tag) => tag),
            tagsOptions: threeRandomPlusCorrectTagsArr,
            gameStatus: 'playing',
            userClicked: false,
        })

        this.attempts = this.attempts+1

        // if(this.attempts === this.apiResultLength) {
        if(this.attempts === this.NUMBER_OF_ATTEMPTS) {
            this.setState ({
                gameStatus: "gameOver"
            })
        }
    }

    addOneToCounter = () => {
        this.counter = this.counter+1
    }

    userHasClicked = () => {
        this.setState({
            userClicked: true
        })
    }

    formatOptions = (arrayOfTaggedPeople) => {
        return arrayOfTaggedPeople.map((person) => `@${person}`).join(', ')
    }

    // profileId = '42596988';
    //cuore ID

    profileId='32402644';
    //Rut's ID
    numberOfPosts = '275';

    componentDidMount() {
        fetch(`https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"${this.profileId}","first":${this.numberOfPosts}}`)
          .then(res => res.json())
          .then(data => this.setState({ data: data.data.user.edge_owner_to_timeline_media.edges }))
          .then(() => this.cleanApiResponse())
          .then(() => this.setRandomImageAndTags())
    }


    render () {

        const { randomImageSrc, tagsOptions, userClicked } = this.state;
        
        if (this.state.gameStatus === "loading") {
            return (
                <div className="loading">
                    <Loading/>
                </div>
            )
        }

        if (this.state.gameStatus==="playing") {
            return (
                <div className="instagram-game">
                    <div className="imageAndLocationsContainer">
                    <h1>{texts[this.props.language].whosTaggedQuestionText}</h1>
                        <div className="imageDisplayedContainer">
                            <div className="imageDisplayed">
                                <img src={randomImageSrc} alt="radom capture from the user's instagram feed" />
                            </div>
                        </div>
                        
                        <div className="instagram-location-buttons">
                            {tagsOptions.map((option, index) => {
                                return (
                                    <div key={index} className="instagram-option-button">
                                        <ButtonIgRoundOne
                                            value={this.formatOptions(option)}
                                            currentTags={this.formatOptions(this.state.randomImageTags)}
                                            addToCounter={this.addOneToCounter}
                                            key={index}
                                            setRandomImageAndTags={this.setRandomImageAndTags}
                                            userClicked={userClicked}
                                            userHasClicked={this.userHasClicked}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <p>{texts[this.props.language].correctAnswers} {this.counter} / {this.oficial_number_of_attempts}</p>
                    </div>
                </div>
            )
        } if (this.state.gameStatus==="gameOver" & this.state.name !== undefined) {
            return (
                <div>
                    <h1>Has llegado al final de esta ronda. Te atreves con la segunda? </h1>
                    <Link to="instagramroundtwo">Juega una segunda ronda</Link>
                </div>
            )
        } else {
            return (
                <Register currentGame={"instagram"}/>
            )
        }
    }
}

export default InstagramRoundOne;


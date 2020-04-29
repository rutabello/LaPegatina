import React, { Component } from 'react';
import Shuffle from '../../Utils/Shuffle';
import ButtonIgRoundTwo from './ButtonIgRoundTwo';
import texts from '../../../texts.json';
import Loading from '../../Utils/Loading/Loading';
import GameEnded from '../../GameEnded/GameEnded';
import MembersAccounts from './MembersAccounts';
import Navbar from '../../Navbar/Navbar';
import '../Instagram.css';


class InstagramRoundTwo extends Component {

    NUMBER_OF_ATTEMPTS = 2

    OFICIAL_NUMBER_OF_ATTEMPTS = this.NUMBER_OF_ATTEMPTS - 1

    state = {
        randomImageSrc: '',
        randomImageLocation: '',
        locationOptions: [],
        data: [],
        gameStatus: 'choosing',
        userClicked: false,
    }

    numberOfPosts = '100';

    attempts= 0;

    counter= 0;

    apiCleanedResult = {}

    apiResultLength = 0


    // Cleans the object retrieved from the api and leaves an array of objects that just
    // have the image source for the picture and the image location
    cleanApiResponse = () => {

        const { data } = this.state;

        const images = data.filter((img) => img.node.location !== null);

        const result = images.map((image) => ({
            src: image.node.thumbnail_resources[4].src,
            location: image.node.location.name,
        }));

        this.apiCleanedResult = result;

        this.apiResultLength = result.length;
    }

    // Takes off the first element of the array resulting in cleanApiResponse (called result) and takes the next 3 elements
    setRandomImageAndLocations = () => {

        Shuffle(this.apiCleanedResult);

        const firstElement = this.apiCleanedResult.shift();

        const imagesObjArr = this.apiCleanedResult.slice(0, 3);

        const threeLocationsArr = imagesObjArr.map((imageObj) => imageObj.location);

        threeLocationsArr.push(firstElement.location); // Cuando hacemos el push, el mismo array, con el mismo nombre,
        // pasa de tener 3 elementos a tener 4. Si igualamos esta array a una constante, no estaríamos guardando
        // la array de 4 elementos resultante sinó que guardaríamos el resultado del push, que sería soplo el
        // número 4, tantos como elementos tiene dentro la array

        const threeRandomPlusCorrectLocationArr = Shuffle(threeLocationsArr);

        this.setState({
            randomImageSrc: firstElement.src,
            randomImageLocation: firstElement.location,
            locationOptions: threeRandomPlusCorrectLocationArr,
            gameStatus: 'playing',
            userClicked: false,
        });

        this.attempts += 1;

        // if (this.attempts === this.apiResultLength) {
        if (this.attempts === this.NUMBER_OF_ATTEMPTS) {
            this.setState({
                gameStatus: 'gameOver',
            });
        }
    }

    addOneToCounter = () => {
        this.counter += 1;
    }

    userHasClicked = () => {
        this.setState({
            userClicked: true,
        });
    }

    chooseAgain = () => {
        this.setState({
            gameStatus: 'choosing',
        });

        this.attempts = 0;

        this.counter = 0;
    }

    setSelectedMemberId = (memberId) => {

        this.setState({
            gameStatus: 'loading',
        });

        fetch(`https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables=
        {"id":"${memberId}","first":${this.numberOfPosts}}`)
            .then((res) => res.json())
            .then((data) => this.setState({ data: data.data.user.edge_owner_to_timeline_media.edges }))
            .then(() => this.cleanApiResponse())
            .then(() => this.setRandomImageAndLocations());
    }


    // 'https://codeofaninja.com/tools/find-instagram-user-id'

    // profileId='32402644';
    // Rut's ID

    // profileId = '10934686';
    // LaPegatina ID

    render() {

        const { randomImageSrc, locationOptions, userClicked, gameStatus, randomImageLocation } = this.state;

        const { language } = this.props;

        if (gameStatus === 'loading') {
            return (
                <div className="loading">
                    <Loading />
                </div>
            );
        }

        if (gameStatus === 'choosing') {
            return (
                <div className="choosing">
                    <MembersAccounts
                        setSelectedMemberId={this.setSelectedMemberId}
                        language={language}
                    />
                </div>
            );
        }

        if (gameStatus === 'playing') {
            return (
                <div className="instagram-game">
                    <div className="imageAndLocationsContainer">
                        <h1>{texts[language].instagramRoundTwoQuestion}</h1>
                        <div className="imageDisplayedContainer">
                            <div className="imageDisplayed">
                                <img src={randomImageSrc} alt="radom capture from the user's instagram feed" />
                            </div>
                        </div>
                        <div className="instagram-location-buttons">
                            {locationOptions.map((option, index) => (
                                <div key={index} className="instagram-option-button">
                                    <ButtonIgRoundTwo
                                        value={option}
                                        currentLocation={randomImageLocation}
                                        addToCounter={this.addOneToCounter}
                                        key={index}
                                        setRandomImageAndLocations={this.setRandomImageAndLocations}
                                        userClicked={userClicked}
                                        userHasClicked={this.userHasClicked}
                                    />
                                </div>
                            ))}
                        </div>
                        <p>
                            {texts[language].correctAnswers}
                            {' '}
                            {this.counter}
                            {' '}
                            /
                            {' '}
                            {this.OFICIAL_NUMBER_OF_ATTEMPTS}
                        </p>
                    </div>
                </div>
            );
        }

        if (gameStatus === 'gameOver') {
            return (
                <div>
                    <Navbar addedClass="fixTop" />
                    <GameEnded points={this.counter * 2653} changeBandMember={this.chooseAgain} language={language} currentGame="instagram" />
                </div>
            );
        }

        return null;
    }

}

export default InstagramRoundTwo;

import React, {Component} from 'react';
import Shuffle from '../Utils/Shuffle'
import ButtonIG from './Button_Ig';
import texts from '../../Components/texts.json';

import './Instagram.css';

class Instagram extends Component {

    state = {
        randomImageSrc: "",
        randomImageLocation: "",
        locationOptions: [],
    }

    attempts= 0;
    counter= 0;
    apiCleanedResult = {}
    apiResultLength = 0


   //Cleans the object retrieved from the api and leaves an array of objects that just have the image source for the picture and the image location
    cleanApiResponse = (apiResponse) => {
        const images = apiResponse.edge_owner_to_timeline_media.edges.filter(img => img.node.location !== null)

        const result = images.map((image) => ({
            src: image.node.thumbnail_resources[4].src,
            location: image.node.location.name
        }))

        this.apiCleanedResult = result;

        this.apiResultLength = result.length
    }

    //Takes off the first element of the array resulting in cleanApiResponse (called result) and takes the next 3 elements
    setRandomImageAndLocations = () => {

        Shuffle(this.apiCleanedResult)

        const firstElement = this.apiCleanedResult.shift();

        const imagesObjArr = this.apiCleanedResult.slice(0, 3);

        const threeLocationsArr = imagesObjArr.map((imageObj) => imageObj.location)

        threeLocationsArr.push(firstElement.location) //Cuando hacemos el push, el mismo array, con el mismo nombre, pasa de tener 3 elementos a tener 4. Si igualamos esta array a una constante, no estaríamos guardando la array de 4 elementos resultante sinó que guardaríamos el resultado del push, que sería soplo el número 4, tantos como elementos tiene dentro la array

        const threeRandomPlusCorrectLocationArr = Shuffle(threeLocationsArr)

        this.setState ({
            randomImageSrc: firstElement.src,
            randomImageLocation: firstElement.location,
            locationOptions: threeRandomPlusCorrectLocationArr,
        })

        this.attempts = this.attempts+1
    }

    addOneToCounter = () => {
        this.counter = this.counter+1
    }

    async componentDidMount() {
    
        const response = await fetch('https://www.instagram.com/bestvacations/?__a=1');
        // const response = await fetch('https://www.instagram.com/travelandleisure/?__a=1');
        // const response = await fetch('https://www.instagram.com/lapegatina/?__a=1');
    
        const data = await response.json();

        console.log(data)

        const info = data.graphql.user

        console.log("PACO", info)

        this.cleanApiResponse(info)

        this.setRandomImageAndLocations()

    };


    render () {

        const { randomImageSrc, locationOptions } = this.state;

        if (this.attempts < this.apiResultLength) {
            return (
                <div className="imageAndLocationsContainer">
                    <div className="imageDisplayedContainer">
                        <div className="imageDisplayed">
                            <img src={randomImageSrc} alt="" />
                        </div>
                    </div>
                    <h1>{texts[this.props.language].instagramQuestion}</h1>
                    {locationOptions.map((option, index) => {
                        return (
                            <ButtonIG value={option} currentLocation={this.state.randomImageLocation} addToCounter={this.addOneToCounter} key={index} setRandomImageAndLocations={this.setRandomImageAndLocations}
                            >
                            </ButtonIG>
                        )
                    })}
                    <p>{texts[this.props.language].correctAnswers} {this.counter}</p>
                </div>
            )
        } else {
            return (
                <h1>Has llegado al final!</h1>
            )
        }
    }

}

export default Instagram;


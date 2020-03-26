import React, {Component} from 'react';
import Shuffle from '../Utils/Shuffle'

class Instagram extends Component {

    state= {
        images: [],
        onlyImagesArr: [],
        imageCounter: "0"
    }

    async componentDidMount() {
        // const response = fetch(`https://www.instagram.com/lapegatina/?__a=1`)
        //   .then(response => response.json())
        //   .then (result => {
        //     this.setState({
        //       data: result,
        //     })
        //     console.log("PACO", result)
        //   })
    
        const response = await fetch('https://www.instagram.com/lapegatina/?__a=1');
    
        const data = await response.json();
    
        console.log("FROM the API", data.graphql);

        this.setState({
            images: data.graphql.user.edge_owner_to_timeline_media.edges
        })

        this.getPhotoToDisplay();
    };

    getPhotoToDisplay = () => {
        
        this.setState({
            onlyImagesArr: this.state.images.map((image) => image.node.thumbnail_resources[4].src)
        })

        let shuffledOnlyImagesArr = Shuffle(this.state.onlyImagesArr)

        this.setState({
            onlyImagesArr: shuffledOnlyImagesArr
        })
        console.log("Shuffled images arr", shuffledOnlyImagesArr)
    }

    render () {

        const { images } = this.state;
        // const { onlyImagesArr } = this.state;


        return (
            <div>
                {images.map((image) => <img src={image.node.thumbnail_resources[1].src} key={image.node.id} alt="" />)}
            </div>
            // <div>
            //     <img src={onlyImagesArr[0].node.thumbnail_resources[{this.state.imageCounter}].src} alt="" />
            // </div>
        )
    }

}

export default Instagram;


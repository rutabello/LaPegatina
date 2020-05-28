/* eslint-disable max-len */
import React, { Component } from 'react';
import './Concerts.css'
import arenal16 from '../Concerts/Pictures/arenal2016.png';
import arenal19 from '../Concerts/Pictures/arenal2019.png';
import merce19 from '../Concerts/Pictures/merce2019.png';
import vinarock14 from '../Concerts/Pictures/viña_rock_2014.png';
import bilbao18 from '../Concerts/Pictures/bilbao2018.png';
import sanfermin13 from '../Concerts/Pictures/sanfermin2013.png';


class Concerts extends Component {

    state = {
        concertList: [
            {
                id: 1,
                who: 'La Gran Pegatina',
                place: 'Arenal Sound',
                year: '2016',
                videoURL: 'https://www.youtube.com/watch?v=QDHlpJogBwc',
                frame: arenal16
            },
            {
                id: 2,
                who: 'La Pegatina',
                place: 'La Mercè',
                year: '2019',
                videoURL: 'https://www.youtube.com/watch?v=ObjAzB6TqEU',
                frame: merce19
            },
            {
                id: 3,
                who: 'La Pegatina',
                place: 'Viña Rock',
                year: '2014',
                videoURL: 'https://www.youtube.com/watch?v=bDdwhmJ7yrY',
                frame: vinarock14
            },
            {
                id: 4,
                who: 'La Pegatina',
                place: 'Arenal Sound',
                year: '2019',
                videoURL: 'https://www.youtube.com/watch?v=QDHlpJogBwc',
                frame: arenal19
            },
            {
                id: 5,
                who: 'La Pegatina',
                place: 'Bilbao',
                year: '2018',
                videoURL: 'https://www.youtube.com/watch?v=wFC_Ot6m_Qk',
                frame: bilbao18
            },
            {
                id: 6,
                who: 'La Pegatina',
                place: 'San Fermines',
                year: '2013',
                videoURL: 'https://www.youtube.com/watch?v=uJBg45BFXec',
                frame: sanfermin13
            }
        ]
    }

    render() {

        return (
            <div className="concerts-pictures">
                {this.state.concertList.map((concert) => (
                    <div className="concert-picture">
                        <button
                            type="button"
                            className="buttonConcert"
                            onClick={(event) => this.setState({ selectedConcert: event.target.id })}
                        >
                            <img
                                src={concert.frame}
                                id={concert.id}
                                className="concert-picture-detail"
                            />
                            <h6>{concert.place}</h6>
                            <h6>{concert.year}</h6>
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}

export default Concerts;

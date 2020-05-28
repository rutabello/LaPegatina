import React, { Component } from 'react';
// import SocialMedia from '../../SocialMedia/SocialMedia';
import texts from '../../../texts.json';
import './MembersAccounts.css';
import adria from '../../../Pictures/gif/Adria.gif';
import ruben from '../../../Pictures/gif/Ruben.gif';
import axel from '../../../Pictures/gif/Axel.gif';
import ovidi from '../../../Pictures/gif/Ovidi.gif';
import ferran from '../../../Pictures/gif/Ferran.gif';
import miguelon from '../../../Pictures/gif/Miguelon.gif';
import miki from '../../../Pictures/gif/Miki.gif';
import sergi from '../../../Pictures/gif/Sergi.gif';
import romain from '../../../Pictures/gif/Romainv2.gif';

class members extends Component {

    state = {
        pics: [],
    }

    membersaccounts = [
        {
            name: 'Adrià Salas',
            username: '@dariasalsa',
            cleanUsername: 'darisalsa',
            id: '966913838',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/92503928_560318127943873_8264880446152638464_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=o1-F2UBkZ4MAX9zo95n&oh=6c244f9dfe8d6b232463d99a76006eb5&oe=5EEEB868`,
            gif: adria
        },
        {
            name: 'Rubén Sierra',
            username: '@ninhodelosrecaos',
            cleanUsername: 'ninhodelosrecaos',
            id: '9115805',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/29417255_386848998455633_7744074867913261056_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=hGnqCEN6IL0AX-LSFPw&oh=3f3de4291f0a944ee93d6e0cc8952dee&oe=5EEC2D24`,
            gif: ruben
        },
        {
            name: 'Ferran Ibañez',
            username: '@ferranibanez',
            cleanUsername: 'ferranibanez',
            id: '4459158',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/18721932_1866769493565174_1376563776014254080_a.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=dyYuqUh9J48AX_o9giI&oh=b014772f356e103f60c1f2ff1cdec189&oe=5EEB88B5`,
            gif: ferran
        },
        {
            name: 'Romain',
            username: '@foxybodyboy',
            cleanUsername: 'foxybodyboy',
            id: '13259158',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/15035649_1341519052559590_200798195058475008_a.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=VIcZ6PYUbMMAX_HzNcz&oh=6fb4ad650eb93e5b5ba4a16d96b4dc82&oe=5EEE837E`,
            gif: romain
        },
        {
            name: 'Miki Florensa',
            username: '@mikiflorensa',
            cleanUsername: 'mikiflorensa',
            id: '2889579314',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/95774179_250292099417046_2613055620395302912_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=QqAx90uhXJUAX-ODNr7&oh=b2a9956b69ef9d3576876c2e3b304f22&oe=5EEEBCC9`,
            gif: miki
        },
        {
            name: 'Axelinho Magnani',
            username: '@milouzic',
            cleanUsername: 'milouzic',
            id: '194454090',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91232717_244562846714717_7493205282693054464_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=JKhE4kAG-hsAX-UgLbG&oh=e307521044b3c1668bf8718096d9a6f7&oe=5EEDE2E2`,
            gif: axel
        },
        {
            name: 'Ovidi Díaz Escudero',
            username: '@m0vidit0',
            cleanUsername: 'm0vidit0',
            id: '2078886031',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/11350870_458811357638243_1121956767_a.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=-pgwDxQ90LkAX8zdYBp&oh=aa2fe8c60eeb4834f64cdaff56a0ca7d&oe=5EEDFE38`,
            gif: ovidi
        },
        {
            name: 'Sergi López',
            username: '@sergilopezgry',
            cleanUsername: 'sergilopezgry',
            id: '3398157',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/10729177_750964981607591_413744534_a.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=TzrnKLCxLhAAX-AtZX6&oh=5bcaa86b36ee757ccc533d04e999fb9f&oe=5EED16FF`,
            gif: sergi
        },
        {
            name: 'Miguelón',
            username: '@la_bomba_cosmica',
            cleanUsername: 'la_bomba_cosmica',
            id: '1607991476',
            apiUrl: `https://instagram.fbcn9-1.fna.fbcdn.net/v/t51.2885-19/s320x320/67828900_1145359222320415_6985541668724277248_n.jpg?_nc_ht=instagram.fbcn9-1.fna.fbcdn.net&_nc_ohc=5gWtUSZDab0AX9gZepN&oh=a82f81a6a11c052b5e367c450f894a29&oe=5EEBF2C8`,
            gif: miguelon
        },
    ]

    setSelectedMemberId = (id) => {

        const { setSelectedMemberId } = this.props;

        setSelectedMemberId(id);
    }


    render() {
        const { setSelectedMemberId, language } = this.props;
        return (
            <div className="instagram-container">
                <div className="round-questions">
                    <h2>{texts[language].instagramRoundTwoQuestion}</h2>
                    <h3>{texts[language].chooseBandMemnberText}</h3>
                </div>
                <div className="band-members">
                    {this.membersaccounts.map((memberaccount) => (
                        <div className="band-member">
                            <button
                                className=""
                                type="button"
                                key={memberaccount.name}
                                onClick={() => setSelectedMemberId(memberaccount.id)}
                            >
                                {/* <p>{memberaccount.name}</p>
                                <p>{memberaccount.username}</p> */}
                                <img src={memberaccount.gif} alt="member profile pic" />
                            </button>
                        </div>

                    ))}
                </div>

                {/* <div className="social-media-follow-buttons">
                    <SocialMedia
                        language={language}
                    />
                </div> */}
            </div>
        );
    }
}

export default members;

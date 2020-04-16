import React, { Component } from 'react';

class members extends Component {

    state = {

    }

    membersaccounts = [
        {
            name: 'Adrià Salas',
            username: '@dariasalsa',
            id: '966913838',
        },
        {
            name: 'Rubén Sierra',
            username: '@ninhodelosrecaos',
            id: '9115805',
        },
        {
            name: 'Ferran Ibañez',
            username: '@ferranibanez',
            id: '4459158',
        },
        {
            name: 'Romain',
            username: '@foxybodyboy',
            id: '13259158',
        },
        {
            name: 'Miki Florensa',
            username: '@mikiflorensa',
            id: '2889579314',
        },
        {
            name: 'Axelinho Magnani',
            username: '@milouzic',
            id: '194454090',
        },
        {
            name: 'Ovidi Díaz Escudero',
            username: '@m0vidit0',
            id: '2078886031',
        },
        {
            name: 'Sergi López',
            username: '@sergilopezgry',
            id: '3398157',
        },
        {
            name: 'Miguelón',
            username: '@la_bomba_cosmica',
            id: '1607991476',
        },
    ]

    setSelectedMemberId = (id) => {

        const { setSelectedMemberId } = this.props;

        setSelectedMemberId(id);

        // this.setState({}, () => {
        //     this.props.history.push({
        //       pathname: '/instagramroundtwo',
        //       state: {
        //         selectedMemberId: id
        //       }
        //     });
        //   })
    }

    render() {
        const { setSelectedMemberId } = this.props;
        return (
            <div>
                <p>Con el perfil de Instagram de qué miembro de La Pegatina quieres jugar?</p>
                {this.membersaccounts.map((memberaccount) => (
                    <button
                        type="button"
                        key={memberaccount.name}
                        onClick={() => setSelectedMemberId(memberaccount.id)}
                    >
                        {memberaccount.name}
                        {memberaccount.username}
                    </button>
                ))}
            </div>
        );
    }
}

export default members;

import React, { Fragment } from 'react';
import { MyContext } from '../../../../context/MyProvider';
import './UserProfile.css';

const UserPofile = () => (
    <div>
        <MyContext.Consumer>
            {(context) => (
                <Fragment className="profile-text">
                    <hr />
                    <h1>Mi Perfil</h1>
                    <h6>
                        Nombre:
                        {context.state.name}
                    </h6>
                    <h6>
                        Nombre Usuario:
                        {context.state.username}
                    </h6>
                    <h6>
                        Edad:
                        {context.state.age}
                    </h6>
                    <h6>
                        Puntos:
                        {context.state.points}
                    </h6>
                    {/* <button onClick={context.addPoints}><span className ='btn-text-prefil' >Add the points!</span></button> */}
                </Fragment>
            )}
        </MyContext.Consumer>
    </div>
);

export default UserPofile;

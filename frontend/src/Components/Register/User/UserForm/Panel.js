/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { MyContext } from '../../../../context/MyProvider';

const Panel = (props) => (

    <MyContext.Consumer>
        {({ actions }) => (
            <div onClick={() => actions.handlePanelSwitch(props.id)}>
                {props.children}
            </div>
        )}
    </MyContext.Consumer>
);

export default Panel;

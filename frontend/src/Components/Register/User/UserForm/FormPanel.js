import React from 'react';
import { MyContext } from '../../../../context/MyProvider';

const FormPanel = (props) => (
    <MyContext.Consumer>
        {({ state }) => (state.activePanel === props.isActive ? props.children : null)}
    </MyContext.Consumer>
);

export default FormPanel;

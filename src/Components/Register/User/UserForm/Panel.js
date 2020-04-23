import React from 'react'
import { MyContext } from '../../../../context/MyProvider';

const Panel = props => (

    <MyContext.Consumer>
      {({ actions }) => {
      return (
        <div onClick={() => actions.handlePanelSwitch(props.id)}>
          {props.children}
        </div>
        );
      }}
    </MyContext.Consumer>
  );
  export default Panel
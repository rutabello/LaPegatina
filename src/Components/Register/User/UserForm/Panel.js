import React from 'react'
import { MyContext } from '../../../../context/MyProvider';

const Panel = props => (

    <MyContext.Consumer>
      {(context) => {
        return (
          <div onClick={() =>context.state.actions.switchPanel(props.id)}>
            {props.children}
          </div>
        );
      }}
    </MyContext.Consumer>
  );
  export default Panel
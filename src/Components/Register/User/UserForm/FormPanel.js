import React from 'react'
import {MyContext} from '../../../../context/MyProvider'

const FormPanel = props => {
    return (
      <MyContext.Consumer>
        {(context) =>(
          context.state.activePanel === props.isActive ? props.children : null
        )}
      </MyContext.Consumer>
    );
  };
  export default FormPanel
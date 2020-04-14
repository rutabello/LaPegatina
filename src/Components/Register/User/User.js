import React, { Component } from "react";
// import MyProvider from "../../../context/MyProvider"
import UserForm from './UserForm/UserForm'
import UserPofile from "./UserProfile/UserProfile";
import './User.css';
import Score from '../../Score/Score'
class User extends Component {
  state={
  }

  render() {
    return (
      <div>
      <Score score={this.props.location.state.score} />
      {/* <h6>Score:{this.props.location.state.score}</h6> */}
        <div className='user-profile-c'>
         <UserPofile />
         </div>
         <div>
         <UserForm />
         </div>
         </div>
    );
  }
}

export default User;

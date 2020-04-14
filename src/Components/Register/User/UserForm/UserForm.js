import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        lastname: '',
        firstname: '',
        email: '',
        notLogged: true,
      };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.apiURL = this.apiURL.bind(this);
  }
  apiURL() {
    const url = "";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(`Benvingut! Los puntos son guardados!`);
        }
      })
      .catch(e => {
        console.error(e);
        alert("Prova otra vez");
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onClick(e) {
    this.apiURL();
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({
      notLogged:false
    })
  }
  render() {
    return (
      <div className="FormUser">
        <h1>User form</h1>

        <form onSubmit={this.submitForm}>
    <fieldset>
      <legend>Information</legend>
      <div className="form-data">
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={this.onChange}
          value={this.state.lastname}
        />
      </div>

      <div className="form-data">
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          onChange={this.onChange}
          value={this.state.firstname}
        />
      </div>

      <div className="form-data">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.onChange}
          value={this.state.email}
        />
      </div>
      <hr />
      <div className="form-data">
        <input type="submit" value="Send" />
      </div>
    </fieldset>
  </form>
</div>
    );
  }
}
export default UserForm;

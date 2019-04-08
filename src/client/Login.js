/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import axios from 'axios';

// Login component
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    // Functions for handling submits and changes
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Function for handling input changes
  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  // Function for handling form submit
  // Authenticates the inputted data and checks for a matching user
  onSubmit(event) {
    event.preventDefault();
    axios
      .post('/api/authenticate', this.state)
      .then(res => {
        if (res.status === 200) {
          // run the login function in the parent component
          this.props.handleLogin();
          // redirect to /
          this.props.history.push('/');
          this.props.history.state = res.data;
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  // Displaying the output for logging in
  render() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset">
            <div className="demo-card-wide mdl-card mdl-shadow--2dp">
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">Login to Account</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <form onSubmit={this.onSubmit}>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                      id="email"
                      className="mdl-textfield__input"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <label className="mdl-textfield__label" htmlFor="email">
                      Email
                    </label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                      id="password"
                      className="mdl-textfield__input"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                    <label className="mdl-textfield__label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

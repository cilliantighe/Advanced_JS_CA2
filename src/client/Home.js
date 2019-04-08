/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import axios from 'axios';

// Component that acts as the landing page for the application
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    };
  }

  // Calls the server and awaits a response back
  componentDidMount() {
    axios
      .get('/api/home')
      .then(response => this.setState({ message: response.data }));
  }

  // Displaying the output for the home page
  render() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--2-offset">
            <h2>{this.state.message}</h2>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--2-offset">
            <p>Login / Register to access FriendFace features</p>
          </div>
        </div>
      </main>
    );
  }
}

/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component for handling post editing
class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      uid: ''
    };

    // Functions for handling submits and changes
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Calls the server for the post that matches the provided id
  componentDidMount() {
    axios
      .get(`/api/posts/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.user_email,
          uid: response.data.user_id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for handling input changes
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  // Function for handling form submit
  handleSubmit(event) {
    event.preventDefault();

    axios
      .put(`/api/posts/${this.props.match.params.id}/editPost`, this.state)
      .then(res => this.props.history.push('/posts'))
      .catch(error => {
        console.log(error);
      });
  }

  // Displaying the output for editing the post
  render() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col mdl-cell--3-offset">
            <h2> Edit Post </h2>{' '}
            <form onSubmit={this.handleSubmit}>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />{' '}
                <label className="mdl-textfield__label" htmlFor="post">
                  Edit Post{' '}
                </label>{' '}
              </div>{' '}
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                type="submit"
              >
                Submit{' '}
              </button>{' '}
            </form>{' '}
          </div>{' '}
        </div>{' '}
      </main>
    );
  }
}

export default EditPost;

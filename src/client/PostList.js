/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';

// Component for displaying all posts in a list
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      name: '',
      user_id: this.props.history.state._id,
      user_email: this.props.history.state.email
    };

    // Functions for handling submits, changes, edits and deletes
    this.updatePosts = this.updatePosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // The update function is called when the component successfully mounts
  componentDidMount() {
    this.updatePosts();
  }

  // The function 'updatePosts' is used when the page is loaded, a new post is added or deleted
  updatePosts() {
    axios
      .get('/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
        if (this.props.history.state) {
          this.setState({ user_id: this.props.history.state._id });
        } else {
          this.setState({ user_id: '' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for deleting a specific post
  handleDelete(postId) {
    axios
      .delete('/api/posts/delete', {
        data: {
          id: postId
        }
      })
      .then(response => {
        this.updatePosts();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for handling form submits
  handleSubmit(event) {
    const details = {
      name: this.state.name,
      user_id: this.state.user_id,
      user_email: this.state.user_email
    };
    event.preventDefault();

    axios
      .post('/api/createPost', details)
      .then(response => {
        this.updatePosts();
        this.setState({ name: '' });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for handling input changes
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ name: value });
  }

  // Displaying the output for the post list
  render() {
    const postList = this.state.posts.map(u => (
      <Post
        key={u._id}
        id={u._id}
        content={u.name}
        userId={u.user_id}
        email={u.user_email}
        currentUser={this.state.user_id}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col mdl-cell--3-offset">
            <h2>NewsFeed</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  name="post"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label className="mdl-textfield__label" htmlFor="post">
                  New Post
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
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col mdl-cell--3-offset">
            {postList}
          </div>
        </div>
      </main>
    );
  }
}

export default PostList;

/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Component for displaying post content
class Post extends Component {
  constructor(props) {
    super(props);
  }

  // Displaying the output for posts
  // Each post has their own delete and edit buttons that are only visible to those that created the post
  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">{this.props.content}</h2>
          </div>
          <div className="mdl-card__supporting-text">{this.props.email}</div>
          <div className="mdl-card__actions mdl-card--border">
            <div className="mdl-cell mdl-cell--12-col">
              {this.props.userId === this.props.currentUser ? (
                <div className="mdl-cell mdl-cell--6-col buttons">
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    type="button"
                    onClick={() => {
                      this.props.handleDelete(this.props.id);
                    }}
                  >
                    Delete post
                  </button>
                </div>
              ) : (
                <div className="mdl-cell mdl-cell--6-col buttons" />
              )}
              {this.props.userId === this.props.currentUser ? (
                <div className="mdl-cell mdl-cell--6-col buttons">
                  <Link
                    to={`/posts/${
                      this.props.id
                    }/editPost`}
                  >
                    <button
                      className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                      type="button"
                    >
                      Edit Post
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="mdl-cell mdl-cell--6-col buttons" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;

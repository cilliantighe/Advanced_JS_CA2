/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

import React, { Component } from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PostList from './PostList';
import EditPost from './EditPost';
import axios from 'axios';

// Setting up the main navigation for the application and login authentication
class App extends Component {
  constructor() {
    super();

    // Variables for handling the user's login status
    this.state = { loggedIn: false };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  // Function for handling logout
  logout(props) {
    axios
      .get('/api/logout')
      .then(res => {
        this.setState({ loggedIn: false });
        props.history.push('/');
        props.history.state = null;
      })
      .catch(err => console.log(err));
    return null;
  }

  // Function for handling login
  login() {
    this.setState({ loggedIn: true });
  }

  // Displaying the main navigation bar and setting up the Routes
  // The 'withAuth' included in some routes enforces some level of security
  // This means only users can create and edit posts
  render() {
    return (
      <BrowserRouter>
        <div className="mdl-layout mdl-js-layout">
          <header className="mdl-layout__header mdl-layout__header--scroll">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout__title">Friend Face</span>
              <div className="mdl-layout-spacer" />
              <nav className="mdl-navigation">
                {!this.state.loggedIn && (
                  <Link className="mdl-navigation__link" to="/login">
                    Login
                  </Link>
                )}
                {!this.state.loggedIn && (
                  <Link className="mdl-navigation__link" to="/register">
                    Register
                  </Link>
                )}
                {this.state.loggedIn && (
                  <Link className="mdl-navigation__link" to="/posts">
                    NewsFeed
                  </Link>
                )}
                {this.state.loggedIn && (
                  <Link className="mdl-navigation__link" to="/logout">
                    Logout
                  </Link>
                )}
              </nav>
            </div>
          </header>
          <Switch>
            <Route path="/register" component={Register} />
            <Route exact path="/posts" component={withAuth(PostList)} />
            <Route
              exact
              path="/posts/:id/editPost"
              component={withAuth(EditPost)}
            />
            <Route
              path="/login"
              render={props => <Login {...props} handleLogin={this.login} />}
            />
            <Route path="/logout" render={this.logout} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

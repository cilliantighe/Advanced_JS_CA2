/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const mongo_uri =
  'mongodb+srv://cillianT:cilly93@ca-2-vzb9d.mongodb.net/friend-face?retryWrites=true';
mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

// -----------------------------------------------------
// --------FUNCTIONS FOR HANDLING POSTS (CRUD)----------
// -----------------------------------------------------

app.get('/api/posts', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) throw err;

    res.send(posts);
  });
});

app.get('/api/posts/:id', function(req, res) {
  Post.findOne({ _id: req.params.id }, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});
app.put('/api/posts/:id/editPost', (req, res) => {
  const id = req.params.id;

  Post.updateOne({ _id: id }, { $set: req.body }, (err, result) => {
    if (err) throw err;

    console.log('Updated from database');
    return res.send({ success: true });
  });
});

app.delete('/api/posts/delete', (req, res) => {
  Post.deleteOne({ _id: req.body.id }, err => {
    if (err) return res.send(err);

    console.log('Deleted from database');
    return res.send({ success: true });
  });
});

app.post('/api/createPost', withAuth, function(req, res) {
  const { name, user_id, user_email } = req.body;
  const post = new Post({ name, user_id, user_email });
  post.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating new post');
    } else {
      res.status(200).send('Post created');
    }
  });
});

// -----------------------------------------------------
// -----FUNCTIONS FOR HANDLING USER AUTHENTICATION------
// -----------------------------------------------------

app.post('/api/register', function(req, res) {
  console.log(req);
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).send(user);
        }
      });
    }
  });
});

app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

// Function for logging user out
app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);
});

app.listen(process.env.PORT || 8080);

/*
Advanced JavaScript
Author: Cillian Tighe
Student No: N00152737
*/

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user_email: {type: mongoose.Schema.Types.String, ref: 'User'}
});

module.exports = mongoose.model('Post', PostSchema);

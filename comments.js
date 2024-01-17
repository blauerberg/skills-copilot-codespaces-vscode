// Create web server
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const { randomBytes } = require('crypto');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Create an object to store comments
const commentsByPostId = {};

// Create an endpoint to get comments of a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create an endpoint to create a comment
app.post('/posts/:id/comments', async (req, res) => {
  // Create a random id for the comment
  const commentId = randomBytes(4).toString('hex');

  // Get the content of the comment from the request body
  const { content } = req.body;

  // Get the comments of the post from the commentsByPostId object
  const comments = commentsByPostId[req.params.id] || [];

  // Push the new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // Update the commentsByPostId object with the new comments array
  commentsByPostId[req.params.id] = comments;

  // Send the new comment
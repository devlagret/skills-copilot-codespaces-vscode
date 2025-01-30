// Create web server
const express = require('express');
const app = express();
const fs = require('fs');

// Create a new comment
app.post('/', (req, res) => {
  const comment = req.body.comment;
  const commentId = Date.now();
  fs.writeFileSync(`./comments/${commentId}.json`, JSON.stringify({ comment, commentId }));
  res.send({ comment, commentId });
});

// Get all comments
app.get('/', (req, res) => {
  const comments = fs.readdirSync('./comments').map(file => {
    return JSON.parse(fs.readFileSync(`./comments/${file}`));
  });
  res.send(comments);
});

// Get a single comment
app.get('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const comment = JSON.parse(fs.readFileSync(`./comments/${commentId}.json`));
  res.send(comment);
});

// Update a comment
app.put('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const newComment = req.body.comment;
  const comment = JSON.parse(fs.readFileSync(`./comments/${commentId}.json`));
  comment.comment = newComment;
  fs.writeFileSync(`./comments/${commentId}.json`, JSON.stringify(comment));
  res.send(comment);
});

// Delete a comment
app.delete('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  fs.unlinkSync(`./comments/${commentId}.json`);
  res.send({ commentId });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
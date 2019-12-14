// library
const express = require('express');

// global object
const server = express();

// routing
server.use(express.json());

// define the route for all posts
server.get('/api/projects', (req, res) => {
  res.send(`Projects`)
});

module.exports = server;
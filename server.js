// library
const express = require('express');
const logger = require('morgan');
const projectsRouter = require('./routers/projectsRouter');

// global object
const server = express();

// middleware
server.use(logger('dev'));

// routing
server.use(express.json());
server.use('/api/projects', projectsRouter);

// define the route for all projects
server.get('/api/projects', (req, res) => {
  res.send(`<h1>Projects</h1>`)
});

module.exports = server;
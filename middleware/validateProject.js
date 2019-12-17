const projects = require('../data/helpers/projectModel');

function validateProjectId() {
  return (req, res, next) => {
    projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(400).json({
          message: 'Invalid project ID.'
        })
      }
    })
  };
};

function validateProject() {
  return (req, res, next) => {
    // define name and description as request body
    const { name, description } = req.body;
    if (!req.body) {
      res.status(400).json({
        message: 'Missing project data'
      });
    } // if title or description are missing
      else if (!name || !description) {
      // respond with 'bad request' status code and json error message
      res.status(400).json({
        errorMessage: 'A name and description are both required to add a project.'
      })
    } else {
      next()
    }
  };
};

module.exports = {
  validateProjectId,
  validateProject
};
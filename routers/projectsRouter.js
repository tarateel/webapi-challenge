const express = require('express');

const projects = require('../data/helpers/projectModel');

const router = express.Router();

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get('', (req, res) => {
  // request an array of all projects in the db
  projects.get()
  .then(projects => {
    //respond with status code OK and the array of projects
    res.status(200).json(projects)
  })
  .catch(err => {
    // if an error, respond with 'server error' code and json error message
    res.status(500).json({
      errorMessage: 'The projects information could not be retrieved.'
    })
  });
});

// fetch a project by id
router.get('/:id', (req, res) => {
  // request a project by ID parameter
  const project_id = req.params.id;
  projects.get(project_id)
    .then(project => {
      // if project is found
      if (project) {
        // respond with 'OK' status code and the project
        res.status(200).json(project)
        // otherwise
      } else {
        // cancel, respond with 'not found' code and json message
        return res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
      }
    })
    .catch(err => {
      // if an error, respond with 'server error' code and json error message
      res.status(500).json({
        errorMessage: 'The project information could not be retrieved.'
      })
    });
});

module.exports = router;
const express = require('express');

const projects = require('../data/helpers/projectModel');
const actionsRouter = require('./actionsRouter');
const { validateProjectId, validateProject } = require('../middleware/validateProject');

const router = express.Router();

router.use('/:id/actions', actionsRouter);

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get('/', (req, res) => {
  // request an array of all projects in the db
  projects.get()
  .then(projects => {
    //respond with status code OK and the array of projects
    res.status(200).json(projects)
  })
  .catch(err => {
    // if an error, respond with 'server error' code and json error message
    res.status(500).json({
      err: err,
      errorMessage: 'The projects information could not be retrieved.'
    })
  });
});

// fetch a project by id
router.get('/:id', validateProjectId(), (req, res) => {
  res.json(req.project)
});

// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
// name	string	required.
// description	string	required.
// completed	boolean	used to indicate if the project has been completed, not required
router.post('/', (req, res) => {
  // insert new project
  projects.insert(req.body)
  .then(project => {
    // and respond with 'created' code' and the new post
    res.status(201).json(project)
  })
  .catch(err => {
    // if an error, respond with 'server error' code and json error message
    res.status(500).json({
      err: err,
      errorMessage: 'There was an error while saving the project to the database.'
    })
  })
});

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
router.put('/:id', (req, res) => {
  // define request body and id
  const changes = req.body;
  const { name, description } = req.body;
  const { id } = req.params;
  // request to update id & changes to be made parameters
  projects.update(id, changes)
    .then(project => {
      // if project is found with the requested id
      if (project) {
        // respond with 'OK' code and the resulting changes
        res.status(200).json(changes)
        // if project is nout found
      } else {
        res.status(404).json({
          // respond with 'not found' code and json message
          errorMessage: 'The project with the specified ID does not exist.'
        })
      }
    })
    // if there is an error updating project,
    .catch(err => {
      // return 'server error' code and json error message
      res.status(500).json({
        err: err,
        errorMessage: 'The project information could not be modified.'
      })
    });
});

// remove(): the remove method accepts an id as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete('/:id', validateProjectId(), (req, res) => {
  // request to remove project with the specified id
  projects.remove(req.project.id)
    .then(() => {
      res.status(200).json({
        message: 'Deleted one record.'
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        errorMessage: 'The project could not be removed.'
      })
    });
});

module.exports = router;
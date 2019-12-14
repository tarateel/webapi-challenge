// library
const express = require('express');

// database file
const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');

// router handler
const router = express.Router({
  mergeParams: true
});

// getProjectActions() takes a project id as it's only argument and returns a list of all the actions for the project.
// project_id	number	required, must be the id of an existing project.
// description	string	up to 128 characters long, required.
// notes	string	no size limit, required. Used to record additional notes or requirements to complete the action.
// completed	boolean	used to indicate if the action has been completed, not required
router.get('/', (req, res) => {
  // request actions by ID parameter
  projects.getProjectActions(req.params.id)
    .then(actions => {
      // return 'OK' code and the actions on the specified project
      res.status(200).json(actions);
    })
    .catch(err => {
      // if an error, respond with 'server error' code and json error message
      res.status(500).json({
        err: err,
        errorMessage: 'The actions on this project could not be retrieved.'
      });
    });
});

router.get('/:actionId', (req, res) => {
  // request action by project id and action id parameters
  actions.get(req.params.id, req.params.actionId)
  .then(action => {
    // return 'OK' code and the actions on the specified project
    res.status(200).json(action)
  })
  .catch(err => {
    // if an error, respond with 'server error' code and json error message
    res.status(500).json({
      err: err,
      errorMessage: 'The requested action could not be retrieved.'
    })
  });
});


module.exports = router;
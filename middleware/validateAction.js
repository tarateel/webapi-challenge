const actions = require('../routers/actionsRouter');

function validateActionId() {
  return (req, res, next) => {
    actions.get(req.params.actionId)
    .then(action => {
      if (action) {
        req.action = action
        next()
      } else {
        res.status(400).json({
          message: 'Invalid action ID.'
        })
      }
    })
  };
};

function validateAction() {
  return (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if (!req.body) {
      res.status(400).json({
        message: 'Missing action data.'
      })
    } else if (!description || !notes) {
      res.status(400).json({
        errorMessage: 'Description and notes are both required to create an action.'
      })
    } else if (description.length > 128) {
      res.status(400).json({
        message: 'Description cannot be longer than 128 characters.'
      })
    } else if (!project_id) {
      res.status(400).json({
        message: 'The id of the project is required to add the action.'
      })
    } else if (project_id !== req.params.id) {
      res.status(400).json({
        message: 'Cannot add an action without the correct project_id.'
      })
    } else {
      next()
    }
  };
};

module.exports = {
  validateActionId,
  validateAction
};
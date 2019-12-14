// library
const express = require('express');

// database file
const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');

// router handler
const router = express.Router({
  mergeParams: true
});



module.exports = router;
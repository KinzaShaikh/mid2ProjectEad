const express = require('express');
const route = express();
const controller = require('../controllers/Controller')

route.get('/',controller.displayHome);
route.get('*',controller.displayError);

module.exports = route;
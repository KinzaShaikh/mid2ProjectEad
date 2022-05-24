const express = require('express');
const route = express();
const controller = require('../controllers/Controller')

route.get('/',controller.displayHome);
//route.get('*',controller.displayError);
route.post('/userRegistered',controller.registerUser);
route.get("/displayUsers",controller.displayUsers);

route.get('/display',controller.display)
//route.get('/userRegistered',controller.displayUsers);

module.exports = route;
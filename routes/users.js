/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const authenticate = require('./helpers/authenticate.js');

module.exports = (db) => {
  //LOGIN BUTTON PRESS - AUTHENTICATE
  router.post('/login', (req, res) => {
    //CALL AUTHENTICATION FUNCTION FROM HELPER FILE
    const serializedUser = $( 'NAME OF TEXT INPUT' ).serialize();
    const serializedPass = $( 'NAME OF PASSWORD INPUT' ).serialize();
    const loggedIn = authenticate.authorize(serializedUser, serializedPass, db);

    //IF AUTHENTICATED
    //set req.session to include the user id!!!!!!!!!
    //DATABASE QUERY FOR MAP IDs OWNED BY USER
    db.query(`SELECT maps.id, maps.name FROM maps JOIN users ON maps.user_id = users.id WHERE maps.user_id = ${serializedUser};`)
      .then(data => {
        //response should include list of map_IDs for user who logged in
        //response should include SEPARATE list of map_IDs for all users
        const mapsList = data.rows;
        res.json({ mapsList });
      })
      .catch(err => {
        //CREATE ERROR CODE
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //LOGOUT BUTTON PRESS
  router.post('/logout', (req, res) => {
    //delete cookies from req.session
    //change top bar to logged out appearance
  });

  //REGISTER BUTTON PRESS - AUTHENTICATE
  router.post('/register', (req, res) => {
    //validate form data
    //check if fields are empty, have min number of characters, etc
    //if fail, render error?
    //else validate on database
    db.query(`SELECT id FROM users;`)
      .then(data => {
        //potentially need to parse data

        //run for loop to check if user already exists
        //if yes, respond with error
        //else INSERT to db
        //set user id inside req.session to indicate logged-in
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });


  });

  //GET USER PROFILE
  router.get('/:id', (req, res) => {
    //RENDER LIST OF ALL MAPS MADE BY A USER
    //database query for maps owned by req.params.id
    const { id } = req.params;

    db.query(`SELECT map_id FROM maps WHERE user_id = ${id}`)
      .then(data => {
        //possibly parse data
        //create array of map IDs to be sent in response
        //send array in response!
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};

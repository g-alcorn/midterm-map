/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { authorize } = require('../helpers/authenticate');
const { registration, validateForm } = require('../helpers/register');

module.exports = (db) => {
  //LOGIN BUTTON PRESS - AUTHENTICATE
  router.post('/login', (req, res) => {
    console.log("login button pressed");
    //CALL AUTHENTICATION FUNCTION FROM HELPER FILE
    //const { username, login-password } = req.body;
    const { password, username } = req.body;
    const inputHash = bcrypt.hashSync(password, 10);
    const loggedIn = authorize(username, inputHash, db);
    console.log(loggedIn);
    //IF AUTHENTICATED
    //set req.session to include the user id!!!!!!!!!
    //DATABASE QUERY FOR MAP IDs OWNED BY USER
    if (loggedIn) {
      return true;
      db.query(`SELECT maps.id, maps.name FROM maps JOIN users ON maps.user_id = users.id WHERE maps.user_id = ${serializedUser};`)
        .then(data => {
          //response should include list of map_IDs for user who logged in
          //response should include SEPARATE list of map_IDs for all users
          const mapsList = data.rows;
          console.log(mapsList);
          res.json({ mapsList });
        })
        .catch(err => {
          //CREATE ERROR CODE
          res
            .status(500)
            .json({ error: err.message });
        });
    } else if (!loggedIn) {
      res
        .status(500)
        .json({ error: error.message });
    }

  });

  //LOGOUT BUTTON PRESS
  router.post('/logout', (req, res) => {
    //delete cookies from req.session
    //change top bar to logged out appearance
  });

  //REGISTER BUTTON PRESS - AUTHENTICATE
  router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log("register button pressed");


    //formErrors will be FALSE if fields are valid
    const formErrors = validateForm(email, passwordHash);
    console.log(formErrors);
    if (!formErrors) {
      registration(email, passwordHash, db);
    } else {
      res
        .status(500)
        .json({ error: err.message});
    }
  });

  //GET USER PROFILE ---- COMMENTED OUT
  //BECAUSE IT IS NOT RESTful ENOUGH
  // router.get('/:id', (req, res) => {
    //RENDER LIST OF ALL MAPS MADE BY A USER
    //database query for maps owned by req.params.id
    //const { id } = req.params;
    //console.log('for some reason this is running')
    // db.query(`SELECT map_id FROM maps WHERE user_id = ${id}`)
    //   .then(data => {
    //     //possibly parse data
    //     //create array of map IDs to be sent in response
    //     //send array in response!
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  //});


  return router;
};

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //LOGIN BUTTON PRESS - SHOW FORM
  router.get('login', (req, res) => {
    //RENDER FORM WITH AJAX
  });

  //LOGIN BUTTON PRESS - AUTHENTICATE
  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        //CALL AUTHENTICATION FUNCTION FROM HELPER FILE
        const users = data.rows;
        res.json({ users });
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
    //delete cookies
    //change top bar to logged out appearance
  });

  //REGISTER BUTTON PRESS - SHOW FORM
  router.get('/register'), (req, res) => {
    //RENDER FORM WITH AJAX
  }

  //REGISTER BUTTON PRESS - AUTHENTICATE
  router.post('/register', (req, res) => {
    //validate form data with helper function
    //save to DB
    //create cookies and convert to logged-in view
  });

  //GET USER PROFILE
  router.get('/:id', (req, res) => {
    //RENDER LIST OF ALL MAPS MADE BY A USER
  })
  return router;
};

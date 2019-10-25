/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const { getUserWithEmail } = require('../helpers/authenticate');
// const { addUser } = require('../helpers/register');
const bcrypt = require('bcrypt');

module.exports = (db) => {

  const addUser = (user) => {
    return db
      .query(
        `
    INSERT INTO users (email, password)
    VALUES
    ($1, $2)
    RETURNING *;
    `,
        [`${user.email}`, `${user.password}`]
      )
      .then(res => res.rows[0]);
  }


  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    addUser(user)
    .then(user => {
      console.log(user.id + 'jdldsfjlsjf')
      if (!user) {
        res.send({error: "error"});
      }
      req.session.userId = user.id;
      console.log('logged in');
      res.send("logged in");
    })
    .catch(e => res.send(e));
  });

  const getUserWithEmail = function(email) {
    return db.query(
        `
    SELECT *
    FROM users
    WHERE email = $1;
    `, [`${email}`])
      .then(res => res.rows[0]);
  };



  const login =  function(email, password) {
    return getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        console.log(user);
        return true;
      }
      return null;
    });
  }
  //LOGIN BUTTON PRESS - AUTHENTICATE
  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        console.log(user + 'backend')
        if (user === null) {
          res.json(null);
          return;
        }
        req.session.userId = user.id;
        res.json({user: {email: user.email, id: user.id}})
           .status(200);
      })
      .catch(response => {
        console.log(response);
      });
  });

  //LOGOUT BUTTON PRESS
  router.post('/logout', (req, res) => {
    //delete cookies from req.session
    req.session = null;
    res.send({});
    //change top bar to logged out appearance
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

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/logout', (req, res) => {
    //delete cookies
    //change top bar to logged out appearance
  });

  router.post('/register', (req, res) => {
    //validate form data
    //save to DB
    //create cookies and convert to login view
  });

  return router;
};

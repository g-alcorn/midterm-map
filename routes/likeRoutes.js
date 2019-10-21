//LIKE BUTTON FUNCTIONALITY
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //LIKE-BUTTON PRESS
  router.post('/:id/maps/map/like', (req, res) => {
    //logic: if already liked => unlike

    //else if not already liked
    //post to database and ajax render
  });
}

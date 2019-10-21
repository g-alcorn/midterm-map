const express = require('express');
const router  = express.Router();

//ROUTES THAT WILL CREATE, EDIT, SAVE MAPS
module.exports = (db) => {
  //NEW MAP - OPEN EDITOR WITH BLANK TEMPLATE
  router.get('/:id/maps/create', (req, res) => {
    //call function in separate helper file
    //use same functions as edit map but starting from blank
  });

  //EDIT MAP
  router.get('/:id/maps/:map_id/edit', (req, res) => {
    //call function in separate helper file to save edit to geoJSON
    //this function must update current view by creating copy of current map geoJSON

    //then the copy can have features added/removed/edited
  });


  //SAVE MAP
  //new: "temporary" geoJSON generated during process will be saved and entered into database
  //edit: temporary copy of geoJSON will be saved and replace old geoJSON in database entry
  router.post('/:id/maps/:map_id/save', (req, res) => {

  });

  //SHOW LIST OF MAPS BY USER
  router.get('/:id/maps', (req, res) => {

  });

  //SHOW LIST OF ALL MAPS
  router.get('/maps', (req, res) => {

  });

  //SHOW SPECIFIC MAP
  router.get('/:id/maps/:map_id', (req, res) => {

  });



  return router;
};

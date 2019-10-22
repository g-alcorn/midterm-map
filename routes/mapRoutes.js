const express = require('express');
const router  = express.Router();

/*************
 * IMPORTANT NOTE ON HOW TO USE URL AS VARIABLE
 * :variable in URL becomes accessible from
 * req.params.variable
**************/


//ROUTES THAT WILL CREATE, EDIT, SAVE MAPS
module.exports = (db) => {
  //NEW MAP - OPEN EDITOR WITH BLANK TEMPLATE
  router.get('/:id/maps/create', (req, res) => {
    //call function in separate helper file
    //use same functions as edit map but starting from blank
  });

  //EDIT MAP
  router.get('/:id/maps/:map_id/edit', (req, res) => {
    const { id, map_id } = req.params;

    //make PG query for the geojson file associated with map_id
    //search geojson file for similar points
    //use trim statement on lat and long to reduce decimal places and get "similar" coords
    //if found, use edit helper function
    //else if not found, use create helper function
  });


  //SAVE MAP
  //new: "temporary" geoJSON generated during process will be saved and entered into database
  //edit: temporary copy of geoJSON will be saved and replace old geoJSON in database entry
  router.post('/save', (req, res) => {

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

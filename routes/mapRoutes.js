const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

/*************
 * IMPORTANT NOTE ON HOW TO USE URL AS VARIABLE
 * :variable in URL becomes accessible from
 * req.params.variable
**************/


//ROUTES THAT WILL CREATE, EDIT, SAVE MAPS
module.exports = (db) => {
  //NEW MAP - OPEN EDITOR WITH BLANK TEMPLATE
  router.get('/maps/create', (req, res) => {
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
    const queryString = 'SELECT * FROM maps';
    db.query(queryString)
      .then(results => {
        res
          .json({ results })
          .status(200);
      })
      .catch(error => {
        console.log(error);
      });


  });

  //SHOW SPECIFIC MAP
  router.get('/:id/maps/:map_id', (req, res) => {
    //DO DATABASE QUERY FOR THE MAP ID
    //GET THE URL FOR THE GEOJSON DATA
    //SEND THAT URL BACK IN RESPONSE TO APP.JS
    const { id, map_id } = req.params;
    console.log('selecting ' + id + ' ' + map_id);
    const queryString = `SELECT maps.location FROM maps WHERE ${map_id} = maps.id`;
    db.query(queryString)
      .then(results => {
        res.json({ rows: results.rows });
      })
      .catch(error => {
        console.log(error);
      });
  });



  return router;
};

$(document).ready(function() {
  //initialize map object as global variable
  const map = new L.Map('mapid').setView([45.5, -73.58], 13);

  //INITIALIZE
  initMap(map);

  //EVENT LISTENERS
  $('.login-register').click(function() {
    $('#login').toggleClass('toggled')
  });

  $('#new-map').click(function() {
    $('#create-map').toggleClass('open')
    $('main').toggleClass('open')
    $('#new-map').toggleClass('open')
  });

<<<<<<< HEAD
  initMap();
=======
  //MAP CLICK
  map.on('click', function(event) {
    console.log('trying to load a bubble');

    //get map id from url
    //REPLACE VARS!
    // $.ajax('/ID_FROM_COOKIE/maps/MAP_ID/edit', { method: 'GET' })
    //   .done(function(INFO FROM SERVER) {
    //    editMap(map, event, data);
    //   })
    //   .fail(function(REASON WHY IT FAILED) {

    // });
  });

>>>>>>> f5b5daad0f26952598b6ac1fdede500448de1b05
});

const initMap = (map) => {
  // create the tile layer with correct attribution
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const background = new L.TileLayer(osmUrl, {attribution: osmAttrib});

  map.addLayer(background);
};

const editMap = (map, event) => {
  //IF THIS IS RUNNING, THE MAP HAS ALREADY BEEN CLICKED
  //get lat and long of point
  const point = event.latlng;
  console.log('clicked at ' + point);

  //create bubble with name, description, photo url fields
  drawEditor(point);

};

const drawEditor = (point) => {
  console.log('drawing editor placeholder');
};


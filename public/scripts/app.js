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

  //MAP CLICK
  map.on('click', function(event) {
    console.log('trying to load a bubble');
    onMapClick(event, map);
    //editMap(map, event);
    //get map id from url
    //REPLACE VARS!
    // $.ajax('/ID_FROM_COOKIE/maps/MAP_ID/edit', { method: 'GET' })
    //   .done(function(INFO FROM SERVER) {
    //    editMap(map, event, data);
    //   })
    //   .fail(function(REASON WHY IT FAILED) {

    // });
  });

});

const initMap = (map) => {
  // create the tile layer with correct attribution
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const background = new L.TileLayer(osmUrl, {attribution: osmAttrib});

  map.addLayer(background);
};

const onMapClick = (e, map) => {
  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString());
  map.openPopup(popup);
};

$(document).ready(function() {
  //initialize map object as global variable
  const map = new L.Map('mapid').setView([45.5, -73.58], 13);

  //INITIALIZE
  initMap(map);

  //EVENT LISTENERS
  //TOGGLE LOGIN BOX
  $('.login-register').click(function() {
    $('#login').toggleClass('toggled')
  });

  //TOGGLE MAP CREATOR SIDEBAR
  $('#new-map').click(function() {
    $('#create-map').toggleClass('open')
    $('main').toggleClass('open')
    $('#new-map').toggleClass('open')
    $('#mapid').toggleClass('open')
  });

  //CHANGE JQUERY SELECTOR TO MATCH NEW/EDIT MAP BUTTONS
  $('form-submit').click(function(event) {
    event.preventDefault();
    const datavar = 0;
    $.ajax('/save', { data: datavar, method: 'POST' })
    .done(function(INFOFROMSERVER) {

    })
    .fail(function(error) {
      console.log(error);
    });
  });

  //MAP CLICK
  map.on('click', function(event) {
    console.log('trying to load a bubble');
    onMapClick(event, map);
  });

});

//SET MAP ATTRIBUTES AND TILES
const initMap = (map) => {
  // create the tile layer with correct attribution
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const background = new L.TileLayer(osmUrl, {attribution: osmAttrib});

  map.addLayer(background);
};

//OPEN POPUP WITH LATLNG
const onMapClick = (e, map) => {
  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString());
  map.openPopup(popup);
};

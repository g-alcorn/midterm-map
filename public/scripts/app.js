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
    $('#new-map').toggleClass('open')
  });

  $('.mdc-fab').click(function() {
    $('#view-maps').addClass('toggled')
    $('#mapid').addClass('open')
    $('main').addClass('open')
  })

  $('#back').click(function() {
    $('#view-maps').removeClass('toggled')
    $('#mapid').removeClass('open')
    $('main').removeClass('open')
  })


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

  //MAP CLICK TESTING
  // map.on('click', function(event) {
  //   console.log('trying to load a bubble');
  //   onMapClick(event, map);
  // });

});

//SET MAP ATTRIBUTES AND TILES
const initMap = (map) => {
  // create the tile layer with correct attribution
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const background = new L.TileLayer(osmUrl, {attribution: osmAttrib});

  map.addLayer(background);

  //add test geojson
  const myFile = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.57818603515624,
            45.5414651417455
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.61320495605469,
            45.43074435456533
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.72787475585938,
            45.51212126820532
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            -73.56651306152344,
            45.49912810913339
          ]
        }
      }
    ]
  };

  const myLayer = L.geoJSON(myFile, {onEachFeature: onEachFeature}).addTo(map);
  //myLayer.addData(myFile);

  //onEachFeature(myFile, myLayer);
};

//OPEN POPUP WITH LATLNG
const onMapClick = (e, map) => {
  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString());
  map.openPopup(popup);
};


const onEachFeature = (feature, layer) => {
  var popupContent = "<p>I started out as a GeoJSON " +
      feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}


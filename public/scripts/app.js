$(document).ready(function() {
  //initialize map object as global variable
  const map = new L.Map('mapid').setView([45.5, -73.58], 13);

  //INITIALIZE
  initMap(map);

  //EVENT LISTENERS
  //TOGGLE LOGIN BOX
  $('.login-register').click(function() {
    if (!$('#registerform').hasClass('toggled')){
      $('#login').toggleClass('toggled');
    } else {
      $('#registerform').removeClass('toggled');
    }
  });

  //TOGGLE MAP CREATOR SLIDE DOWN MENU
  $('#new-map').click(function() {
    $('#create-map').toggleClass('open')
    $('#new-map').toggleClass('open')
  });

  //OPEN SIDEBAR MENU
  $('.mdc-fab').click(function() {
    $('#view-maps').addClass('toggled')
    $('#mapid').addClass('open')
    $('main').addClass('open')
  })

  //
  $('#user-menu-btn').click(function() {
    $('#user-menu').toggleClass('toggled');
  })

  //CLOSE SIDEBAR MENU
  $('#back').click(function() {
    $('#view-maps').removeClass('toggled')
    $('#mapid').removeClass('open')
    $('main').removeClass('open')
  });

  $('LINK TO LOAD MAP ID').click(function(event) {
    event.preventDefault();
    $.ajax('/MAPIDLINK', {method: 'GET'})
      .done(function(geoJsonUrl) {
        loadData();
      })
      .fail(function(error) {
        console.log(error);
      });
  });

  //LOGIN FORM
  $('#login-form').on('submit', function (event) {
    event.preventDefault();

    //RESET EMAIL AND PASSWORD TO BLANK UPON SUBMISSION AND CLOSE FORM
    //SWITCH TO LOGGED IN
    $('#login').removeClass('toggled')
    $('#login-email').val('');
    $('#login-password').val('');
    $('.login-register').addClass('logged-in');
    $('#user-menu-btn').addClass('logged-in');
  });

  //REGISTER FORM
  $('#registerform').on('submit', function (event) {
    event.preventDefault();
    console.log("messagr from appjs")
    registrationData = { email: $('#email'), password: $('#password') };
    console.log(registrationData);
    //RESET EMAIL AND PASSWORD TO BLANK UPON SUBMISSION AND CLOSE FORM
    //SWITCH TO LOGGED IN
    $.ajax('/register', { registrationData, method: 'POST' })
      .done(function(INFOFROMSERVER) {
        $('#registerform').removeClass('toggled');
        $('#register-email').val('');
        $('#register-password').val('');
        $('.login-register').addClass('logged-in');
        $('#user-menu-btn').addClass('logged-in');
      })
      .fail(function(error) {
        console.log(error);
      })
  });

  //CHANGE BETWEEN LOGIN AND REGISTER FORMS
  $('#register').click(function() {
    $('#login').removeClass('toggled')
    $('#registerform').addClass('toggled')
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

};

//OPEN POPUP WITH LATLNG
const onMapClick = (e, map) => {
  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString());
  map.openPopup(popup);
};

//DEFINE POPUP CONTENT FOR EACH FEATURE WITHIN A GEOJSON
const onEachFeature = (feature, layer) => {
  var popupContent = feature.properties.content;
  layer.bindPopup(popupContent);
};

const loadMap = (geoJsonUrl) => {
  //test geojson data
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

  const dataFile = geoJsonUrl;

  //replace myFile with dataFile upon successfully linking to geojson
  let myLayer = L.geoJSON(myFile, { onEachFeature: onEachFeature });
  myLayer.addTo(map)
};

$(document).ready(function() {
  //initialize map object as global variable
  const map = new L.Map('mapid').setView([45.5, -73.58], 13);
  const layerGroup = L.layerGroup().addTo(map);
  const tempLayer = L.layerGroup().addTo(map);
  //INITIALIZE
  initMap(map);

  let isLoggedIn = false;

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

    if($('#new-map').hasClass('open')){
      map.on('click', function(event) {
        makeNewMarker(event, tempLayer);
      });
    } else {
      map.off('click');
    }
  });

  //OPEN SIDEBAR MENU
  $('.mdc-fab').click(function() {
    $('#view-maps').addClass('toggled')
    $('#mapid').addClass('open')
    $('main').addClass('open')
    $.ajax({
      method: 'get',
      url: '/maps'
    })
    .done(function(results) {
      //extract the data from query results
      const arrayOfMaps = results.results.rows;
      //generate html element with jquery
      for(const mapInstance of arrayOfMaps) {
        loadMaps(mapInstance.location);
      }
    })
    .fail(function(error) {
      console.log(error);
    });
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


  //USE MAP-LIST-LINK AS CLASS FOR THE LINKS
  $('.map-list-link').click(function(event) {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: event.currentTarget.href
    })
      .done(function(geoJsonData) {
        const geoJsonUrl = geoJsonData.rows[0];
        loadData(geoJsonUrl, map, layerGroup);
      })
      .fail(function(error) {
        console.log(error);
      });
  });

  //LOGIN FORM
  $('#login-form').on('submit', function (event) {
    event.preventDefault();
    const raw = $('#login-email').serialize();
    const username = '';
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] === '%') {
        username.concat('@');
        i += 2;
      } else {
        username.concat(raw[i]);
      }
    }

    const data = {
      password: $('#login-password').serialize().slice(9),
      username
    };
    let loginData = {email: $('#login-email'), password: $('#login-password')}

    $.ajax({
      method: 'POST',
      data: loginData,
      url: '/login'
    })
    .done(function() {
      isLoggedIn = true;
      $('#login').removeClass('toggled')
      $('#login-email').val('');
      $('#login-password').val('');
      $('.login-register').addClass('logged-in');
      $('#user-menu-btn').addClass('logged-in');
    })
    .fail(function(error) {
      console.log(error);
    })

    //RESET EMAIL AND PASSWORD TO BLANK UPON SUBMISSION AND CLOSE FORM
    //SWITCH TO LOGGED IN
  });

  //REGISTER FORM
  $('#registerform').on('submit', function (event) {
    event.preventDefault();
    registrationData = { email: $('#register-email').val(), password: $('#register-password').val() };
    //RESET EMAIL AND PASSWORD TO BLANK UPON SUBMISSION AND CLOSE FORM
    //SWITCH TO LOGGED IN
    $.ajax({
        method: 'POST',
        data: registrationData,
        url: '/register'
      })
      .done(function() {
        isLoggedIn = true;
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

  //LOGOUT BUTTON
  $('#logout').click(function() {

    $.ajax({
      method: 'POST',
      url: '/logout'
    })
    .done(function() {
      isLoggedIn = false;
      $('#user-menu').removeClass('toggled');
      $('.login-register').removeClass('logged-in');
      $('#user-menu-btn').removeClass('logged-in');
    })
  })

  //CHANGE BETWEEN LOGIN AND REGISTER FORMS
  $('#register').click(function() {
    $('#login').removeClass('toggled')
    $('#registerform').addClass('toggled')
  });


  $('.save').click(function() {
    if($('#map-name').val().length < 1 || $('#map-description').val().length < 1) {
      console.log('please fill out the fields');
    }

    let mapData = { title: $('#map-name').val(), description: $('#map-description').val()};
    const datavar = 0;
    if (!isLoggedIn) {
      console.log('please log in')
    } else {
    $.ajax({
      method: 'POST',
      data: mapData,
      url: '/save'
    })
    .done(function() {
      console.log('hello')
      $('#map-name').val('');
      $('#map-description').val('');
    })
    .fail(function(error) {
      console.log(error);
    })
  }
  })


  //CHANGE JQUERY SELECTOR TO MATCH NEW/EDIT MAP BUTTONS
  // $('#create-new-map').on('submit', function(event) {
  //   event.preventDefault();

  //   if($('map-name').val().length < 1 || $('#map-description').val().length < 1) {
  //     console.log('please fill out the fields');
  //   }
  //   let mapTitle = $('#map-name').val();
  //   let mapDesc = $('#map-description').val();
  //   console.log(mapTitle, mapDesc);
  //   const datavar = 0;
  //   if (!isLoggedIn) {
  //     console.log('please log in')
  //   } else {
  //   $.ajax({
  //     method: 'POST',
  //     data: datavar,
  //     url: '/save'
  //   })
  //   .done(function() {
  //     console.log('hello')
  //   })
  //   .fail(function(error) {
  //     console.log(error);
  //   })
  // }
  // })

  //MAP CLICK TESTING


});

//SET MAP ATTRIBUTES AND TILES
const initMap = (map) => {
  // create the tile layer with correct attribution
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const background = new L.TileLayer(osmUrl, {attribution: osmAttrib});

  map.addLayer(background);

};

//DEFINE POPUP CONTENT FOR EACH FEATURE WITHIN A GEOJSON
const onEachFeature = (feature, layer) => {
  let popup = L.popup();
  popup
    .setLatLng(feature.latlng)
    .setContent(feature.properties.content);
  layer.bindPopup(popup);
};

const onMapClick = (event, map) => {
  let marker = L.marker(event.latlng);
  let popup = L.popup();
  popup
    .setContent('HTML SNIPPET GOES HERE')
    .openPopup();
  marker.bindPopup(popup);
  marker.addTo(map);
};

const makeNewMarker = (event, tempLayer) => {
  let marker = L.marker(event.latlng);
  let popup = L.popup();
  popup
    .setContent(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Popup</title>
      <link rel="stylesheet" href="/styles/map-tag-layout.css" type="text/css">
    </head>
    <header>
      <input id="title" type="text" value="title" placeholder="title">
    </header>
    <input id="description" type="text" value="description" placeholder="description">
    <input id="url" type="url" value="url" placeholder="add a picture">
    </html>
    `)
    .openPopup();
  marker.bindPopup(popup);
  tempLayer.addLayer(marker);
}

//LOAD DATA INTO NEW MAP LAYER
const loadData = (geoJsonUrl, map, layerGroup) => {
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
  const dataSource = geoJsonUrl.location;
  layerGroup.clearLayers();
  //DOWNLOAD GEOJSON FILE
  $.ajax({
    url: dataSource,
    method: 'GET'
  })
    .done(function(geojsonData) {
      //myFile will be replaced with the geojsonData variable from ajax request
      layerGroup.addLayer(L.geoJSON(geojsonData, { onEachFeature: onEachFeature }));
    })
    .fail(function(error) {
      console.log(error);
    });

};

const createMapElement = (mapInfo) => {
  const maps = mapInfo.features;

  for (let element in maps) {
    let mapProperties = maps[element].properties;
    let mapElement =
     `<article class="map-example">
     <header>
     <div>
     <img id="map-img" src=${mapProperties.url}>
     </div>
     <header id="db-map-title">
     ${mapProperties.title}
     </header>
     </header>
     <p id="db-map-description">${mapProperties.description}</p>
     </article>`;
     return mapElement;
  }
};

const loadMaps = (dataSource) => {
  $.ajax({
    url: dataSource,
    method: 'GET'
  })
  .done(function(data) {
    console.log('sup')
    renderMaps(data)
  })
  .fail(function(error){
    console.log(error);
  })
};

const renderMaps = (newMapLink) => {
 $('#map-container').append(createMapElement(newMapLink));
};

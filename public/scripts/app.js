

$(document).ready(function() {
  // const mymap = L.map('mapid').setView([45, -73], 13);
  // L.tileLayer('', {
	//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  // 	maxZoom: 18,
	//   id: 'mapbox.streets',
	//   accessToken: 'your.mapbox.access.token'
  // }).addTo(mymap);

  function initMap() {
    // set up the map
    const map = new L.Map('mapid').setView([45.5, -73.58], 13);

    // create the tile layer with correct attribution
    const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    const layer1 = new L.TileLayer(osmUrl, {attribution: osmAttrib});

    map.addLayer(layer1);
    console.log("initiated map \n" + layer1);
  };

  $('.login-register').click(function() {
    $('#login').toggleClass('toggled')
  });

  $('.new-map').click(function() {
    $('#create-map').toggleClass('toggled')
  });


  initMap();
});

//to be sent to helper later

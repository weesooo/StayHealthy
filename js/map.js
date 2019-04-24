// Main Javascript for map
let map;
// storing markers in array for use later
let markersArray = [];

let chicago = {
  lat: 41.8781,
  lng: -87.6298
};

const APIurl = "https://data.cityofchicago.org/resource/wwy2-k7b3.json$limit=50";
// Initialize and add the map
function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 11
  });

  $.get(APIurl, function(response) {
    let data = response;
    createMarkers(map, data);
  });

  function createMarkers(map, data) {
    // let url = "http://maps.google.com/mapfiles/ms/icons/";
    // url += color + "-dot.png";

    $.each(data, function(i, v) {
      let marker;
      let location = {
        lat: parseFloat(v.latitude),
        lng: parseFloat(v.longitude)
      }

      if (v.football_soccer_combo === '0') {
        marker = new google.maps.Marker({
          map: map,
          position: location,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
          }
        })
      } 
        else {
        marker = new google.maps.Marker({
          map: map,
          position: location,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
          }
        })
      }

      let infowindow = new google.maps.InfoWindow({
        content: 'Ward: ' + v.ward + '<br/>' + 'Status: ' + v.status +
          '<br/>Address: ' + v.street_address + '<br/>SRN: ' + v.service_request_number + '<br/>Graffiti location: ' + v.where_is_the_graffiti_located_ +
          '<br/>Type of Surface: ' + v.what_type_of_surface_is_the_graffiti_on_ + '<br/>Date Created: ' + v.creation_date + '<br/>Completion Date: ' + v.completion_date
      });

      marker.addListener('click', function(results) {
        infowindow.open(map, marker);
      });
        
      let textBox = document.getElementById("input-search-bar").innerHTML;
      console.log(textBox);
      if (textBox.innerHTML > 0) {
        marker.setMap(null);
      }

    });
  }
};
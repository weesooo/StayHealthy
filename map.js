// storing markers in array for use later
let markersArray = [];

let chicago = {
  lat: 41.8781,
  lng: -87.6298
};

const APIurl = "https://data.cityofchicago.org/resource/kcki-hnch.json?$limit=50";

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

      if (v.clinic_type === "STI Specialty Clinic") {
        marker = new google.maps.Marker({
          map: map,
          position: location,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          }
        })
      } 
        else {
        marker = new google.maps.Marker({
          map: map,
          position: location,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        })
      }

      let infowindow = new google.maps.InfoWindow({
        content: 'Clinic Name: ' + v.site_name + '<br/>' + 'ZIP: ' + v.zip +
          '<br/>Street Address: ' + v.street_address + '<br/>Phone Number: ' + v.phone_1 + '<br/>State: ' + v.state + '<br/>Hours of Operation: ' + v.hours_of_operation 
      });

      marker.addListener('click', function(results) {
        infowindow.open(map, marker);
      });
        

    });
  }
};
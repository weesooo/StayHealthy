function initMap() {
  // The location of Uluru
  var chicago = {lat: 41.8781, lng: -87.6298};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 11, center: chicago});

  $.get("https://data.cityofchicago.org/resource/cwig-ma7x.json?$limit=5",

      function(response) {
        console.log("in data callback");
        var data = response;
        createMarkers(map, data );
      });

}

  function createMarkers (map, data) {
    console.log(data);
    $.each(data, function(i,v) {

      var location = {lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) }
      
      var marker = new google.maps.Marker({position: location, map: map});

      var infowindow = new google.maps.InfoWindow({
        content: v.dba_name
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

    });

  }

var official_video_location;
var allow_marker;

function beginaccuracy() {
  document.getElementById("actualscore").innerHTML = localStorage.getItem("radius-streak");
  document.getElementById('start-guessing-btn').setAttribute('onclick','mapmaker()')
  // document.getElementById('guess-button-id').setAttribute('onclick','beginaccuracy()')
  document.getElementById("countdown").style.color = "white";
  document.getElementById("player").style.opacity = "1";
  potential_coords = null;
  correct_coords = null;
  lstlength = videolocations.length
  official_video_number = Math.floor(Math.random() * lstlength) + 1 
  official_video_id = videoids[official_video_number]
  official_video_location = videolocations[official_video_number]
  official_video_seconds = official_video_id.substr(-6);
  official_video_id = official_video_id.substring(0,11);
  console.log(official_video_number, official_video_location)
  document.getElementById("id01").style.display = "none"; 
  document.getElementById("main-button").style.display = "block";
  document.getElementById("main-button2").style.display = "none";
  if(localStorage.getItem("radius-ongoing") == "true") {
    official_video_id = localStorage.getItem("radius-ongoing-id")
    official_video_seconds = localStorage.getItem("radius-ongoing-seconds")
    official_video_location = localStorage.getItem("radius-ongoing-location").split(',')
  }
  player.loadVideoById({'videoId': official_video_id, 'startSeconds': official_video_seconds, 'loop': 1, 'playsinline': 1, 'controls': 0, 'showinfo': 0, 'fs': 0});
  // cvol = player.getVolume();
  // player.setVolume(cvol)
  // document.getElementById("volumeEditor").value = cvol;
  console.log(videolocations)
  document.getElementById('vid-bac').style.display = "block";
  document.getElementById("map-prompter").innerHTML = 'Click Map to Guess <i class="fa fa-map-marker" aria-hidden="true" style="margin-left: 5px;"></i>'
  document.getElementById('original-c').style.display = "block";
  document.getElementById('future-c').style.display = "none";
  document.getElementById("present-z").style.display = "none";
  document.getElementById("actualscore").innerHTML = localStorage.getItem("radius-streak");
  document.getElementById('guess-button-id').setAttribute('onclick','makeaguess2()')
  document.getElementById('guess-button-id2').setAttribute('onclick','beginaccuracy()')
  document.getElementById('guess-button-id3').setAttribute('onclick','beginaccuracy()')
  allow_marker = true;
  localStorage.setItem("accuracy_video_plays", parseInt(localStorage.getItem("accuracy_video_plays")) + 1);
  localStorage.setItem("radius-ongoing", "true")
  localStorage.setItem("radius-ongoing-id", official_video_id)
  localStorage.setItem("radius-ongoing-seconds", official_video_seconds)
  localStorage.setItem("radius-ongoing-location", official_video_location)
}

function mapmaker() {
  document.getElementById('id01').style.display = "block";
    if (map != undefined) {
      map.off();
      map.remove();
    }
    document.getElementById('main-button').style.display='none'
  map = L.map('mapid', {minZoom: 1}).setView([42.35, -71.08], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



  map.setMaxBounds(  [[-90,-180],   [90,180]]  )
  setTimeout(function(){ map.invalidateSize()}, 500);
  map.invalidateSize();
  map.on('click', function(e) {
    if(allow_marker == true) {
      console.log(marker)
              if (marker != undefined) {
                map.removeLayer(marker);
          };
      first_time = 1
      marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      current_latitude = e.latlng.lat
      current_longitude = e.latlng.lng
      console.log(e.latlng.lat)
    }
});
}
var markerArray;
function makeaguess2() {
  allow_marker = false
  console.log('PLAYED')
  document.getElementById("main-button2").style.display = "none"
  // document.getElementById("main-button").style.display = "block"
  // console.log(random_lat_lon)  
  latitude_num = official_video_location[0]
  longitude_num = official_video_location[1]
  distance_between = distance_func(latitude_num, longitude_num, current_latitude, current_longitude, "M")
  distance_between_unrounded = distance_between
  distance_between = Math.round( distance_between );
  if (distance_between_unrounded < radius_streak) {
    var ding = new Audio('static/correct.mp3');
    ding.play();
  } else {
    var ding = new Audio('static/questionwrong.mp3')
    ding.play();
  }
  // else if (distance_between < 500) {
  //   var ding = new Audio('static/correct3.mp3');
  //   ding.play();
  // } else {
  //   var ding = new Audio('static/wrong.mp3')
  //   ding.play();
  // }
  markerArray = [];
  // document.getElementById("x-out").style.display = "none";
  // var checkmark_marker = L.icon({
  //     iconUrl: 'static/checkmark3.png',
  // });
  // var questionmark_marker = L.icon({
  //     iconUrl: 'static/questionmark.png',
  // });
  // var leafIcon = L.getIcon(
  // {icon: 'leaf',
  // markerColor: 'red'}
  // );
    var redmarkerIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var greenmarkerIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    console.log('Within radius')
    markerArray.push(L.marker([official_video_location[0], official_video_location[1]], {icon: greenmarkerIcon}));
    markerArray.push(L.marker([current_latitude, current_longitude], {icon: redmarkerIcon}));



    var group = L.featureGroup(markerArray).addTo(map);
    var two_locations = Array();

    //Get latlng from first marker
    two_locations.push([official_video_location[0], official_video_location[1]], [current_latitude, current_longitude]);

    //Get latlng from first marker
    // two_locations.push([globallat, globallon]);

    //You can just keep adding markers

    if (distance_between_unrounded <= radius_streak) {
      map.setView([official_video_location[0], official_video_location[1]], 11)
      document.getElementById("map-prompter").innerHTML = "<b>Within</b> the radius, and <b>" + String(distance_between) + "</b> mile(s) from the exact location! 🎉 <b>+1</b><span style='font-size: 10px;'> (" +  String(distance_between*1.609) + "km) </span>"
      if(distance_between == 0) {
        document.getElementById("map-prompter").innerHTML = "<b>Less</b> than one mile out. 🎉 <b>+1</b>"        
      }
      localStorage.setItem("radius-streak", parseInt(localStorage.getItem("radius-streak"))+1)
      current_local_score = parseInt(localStorage.getItem("radius-streak"))
      current_local_hs = parseInt(localStorage.getItem("radius-streak-hs"))
      if(current_local_score > current_local_hs) {
        localStorage.setItem("radius-streak-hs", current_local_score)
      }
      document.getElementById("actualscore").innerHTML = String(current_local_score)
      L.circle([official_video_location[0], official_video_location[1]], {
        color: '#56830b',
        fillColor: '#56830b',
        fillOpacity: 0,
        radius: radius_streak * 1609
        // tooltip: 'Hello'
      }).bindTooltip("<b>" + String(radius_streak) + "</b> mile radius. <i class='fa fa-check-circle' aria-hidden='true'></i>", {sticky: true}).addTo(map);
        localStorage.setItem("accuracy_correct_guesses", parseInt(localStorage.getItem("accuracy_correct_guesses")) + 1);
      // localStorage.setItem("radius-streak", 0)
    } else {
      document.getElementById("map-prompter").innerHTML = "<b>" + String(distance_between)+ "</b> miles out, and <b>outside</b> the radius. <i class='fa fa-frown-o' aria-hidden='true'></i> Your streak ends at <b>" + String(localStorage.getItem("radius-streak")) + "</b>." + "<span style='font-size: 10px;'> (" + String((distance_between*1.609).toFixed(1)) + " km)</span>"
      map.fitBounds(group.getBounds(), {padding: [1000, 1000]});
      map.fitBounds(group.getBounds().pad(0.5));
      map.fitBounds(group.getBounds(), {padding: L.point(20, 20)})
      current_local_score = parseInt(localStorage.getItem("radius-streak"))
      current_local_hs = parseInt(localStorage.getItem("radius-streak-hs"))
      if(current_local_score > current_local_hs) {
        localStorage.setItem("radius-streak-hs", current_local_score)
        console.log('Greator!')
      }
      document.getElementById("actualscore").innerHTML = String(current_local_score)
      localStorage.setItem("radius-streak", 0)
      L.circle([official_video_location[0], official_video_location[1]], {
        color: '#56830b',
        fillColor: '#56830b',
        fillOpacity: 0.5,
        radius: radius_streak * 1609
        // tooltip: 'Hello'
      }).bindTooltip("<b>" + String(radius_streak) + "</b> mile radius. <i class='fa fa-times-circle' aria-hidden='true'></i>", {sticky: true}).addTo(map);
    }
    var polyline = L.polyline(two_locations, {color: 'black', dashArray: '10,9'}).addTo(map);


    // map.fitBounds(polyline.getBounds());
    localStorage.setItem("radius-ongoing", "false")
    document.getElementById("original-c").style.display = "none"
    document.getElementById("future-c").style.display = "block"
    setTimeout(function(){ map.invalidateSize()}, 500);
  //     map.on('click', function(e) {
  //       console.log('disb')
  //       // window.location = "https://google.com/"
  // });
  
function distance_func(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}
}
// document.getElementById("vp1").innerHTML = localStorage.getItem("country_video_plays")
document.getElementById("cg1").innerHTML = localStorage.getItem("country_correct_guesses")
document.getElementById("hs1").innerHTML = localStorage.getItem("sovereignt-streak-hs")
// document.getElementById("vp2").innerHTML = localStorage.getItem("accuracy_video_plays")
document.getElementById("cg2").innerHTML = localStorage.getItem("accuracy_correct_guesses")
document.getElementById("hs2").innerHTML = localStorage.getItem("radius-streak-hs")
player.playVideo();

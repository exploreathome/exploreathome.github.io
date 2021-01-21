// var socket = io.connect('http://localhost:4000');
var socket = io.connect('https://secure-players.herokuapp.com/');

var unit = "mi";
// var hostornot = false;
window.addEventListener("focus", () => socket.connect());
function joinroom(username) {
    if(username.length == 0) {
      alert("You forgot to enter a username!")
      document.getElementById("fifth-card").style.display = "block";
      document.getElementById("choice-card").style.display = "none";
      return;
    }
    player.playVideo();
    if(document.getElementById("form-number-1").value = "Kilometres") {
      unit = "km"
      localStorage.setItem("unit", "km")
    } else {
      unit = "mi"
      localStorage.setItem("unit", "mi")
    }
    document.getElementById("fifth-card").style.display = "none";
    setTimeout(function() {
      document.getElementsByClassName("loading")[0].innerHTML = "Syncing Video"
    }, 6000)
    setTimeout(function() {
      document.getElementsByClassName("loading")[0].innerHTML = "Syncing Score"
    }, 9000)
    setTimeout(function() {
      document.getElementsByClassName("loading")[0].innerHTML = "Joining Room"
    }, 10000)
    if(card_selected == 1) {
      let r = Math.random().toString(36).substring(7);
      document.getElementById("choice-card").style.display = "none";
      document.getElementById("sixth-card").style.display = "block";
      rannum = Math.floor(Math.random()*usa_lst.length)+1
      socket.emit("create_room", {
        username: String(username)
      })
    }
    if(isMobile == false) {
            navigator.mediaSession.metadata = new MediaMetadata({});
            aud.loop = true;
            aud.volume = 0;
            aud.play();
            console.log('media')
    }
    // setTimeout(function(){
    //   loadVideoWithId("wor", Math.floor(Math.random()*usa_lst.length)+1)
    // }, 2010);
}
// var times = 0;
socket.on('loadvideo', function(data) {
    // setTimeout(function(){
      synced_game_time = data["synced_game_time"]
      if(data["round_present"] != 1234) {
        round_present = data["round_present"]
      }
      // document.getElementsByClassName("demo")[0].style.display = 'none'
      // document.getEl("demo")[0].style.display = 'none'
      // if(times != 0) {
      // document.getElementsByClassName("demo")[0].style.display = 'block'
      // document.getElementsByClassName("demo")[0].style.zIndex = 1234
      // player.mute();
      // $("#demo-back").slideDown(350);
      // setTimeout(function() {
      //             $("#demo-back").slideUp(350);
      //             document.getElementsByClassName("demo")[0].style.display = 'none'
      //             player.unMute();
      // }, 4000)
      // }
      // times = 1
      player.mute();
      loadVideoWithId("wor", data["number"])
    // }, 2010);
    console.log('RAN AFTER 2010')
})
socket.on('leaderboard', function(data) {
  transmit_json = data["information"]
  var items = Object.keys(transmit_json).map(function(key) {
    return [key, transmit_json[key][0], transmit_json[key][1], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  console.log('MATCHED ITEMS')
  var new_obj = items.slice(0, 10);
  console.log(new_obj)
  for(let x=0;x<new_obj.length;x++) {
    console.log(new_obj[x][0])
    document.getElementsByClassName("li-class")[x].style.display = "block";
    document.getElementsByClassName("user-name-score")[x].innerHTML = String(new_obj[x][4])
    document.getElementsByClassName("user-name-ll")[x].innerHTML = String(new_obj[x][0])
    document.getElementsByClassName("li-circles")[x].style.backgroundColor = String(new_obj[x][5])
    document.getElementsByClassName("li-class")[x].style.borderBottom = "thin solid rgb(255, 255, 255)"
    console.log('Finished')
  }
  document.getElementsByClassName("li-class")[new_obj.length-1].style.borderBottom = "none";
})
// var multiplayer_guesses = {}
var number_of_players = 0;
var nop = 0;
socket.on('guess', function(data) {
  // unit = "m"
  console.log('NOP VS NUMOFPLAYERS:')
  console.log(nop)
  console.log(number_of_players)
  number_of_players++
  distance_away = distance_func(data["coordinates"].lat, data["coordinates"].lng, random_lat_lon[0], random_lat_lon[1], "m")
    for(let num=0; num<10; num++) {
      if(document.getElementsByClassName("li-class")[num].style.display == 'block') {
        console.log('uno')
        console.log(data["username"])
        if(String(document.getElementsByClassName("user-name-ll")[num].innerHTML) == String(data["username"])) {
          console.log('abcmouse')
          if(document.getElementById("tooltip-text-id" + String(num)).style.display == "none") {
            console.log("IM DOIN IT WHATT")
            if(unit == "km") {
              distance_away = String((parseInt(distance_away)*1.609).toFixed(1)) + "km"
            } else {
              distance_away = String(distance_away) + " mi's"
            }
            document.getElementById("tooltip-text-id" + String(num)).innerHTML = "I'm <b>"+ String(distance_away) + "</b> out. <span style='margin-left: 5px;'>👈</span>";
            if(isMobile) {
             document.getElementsByClassName("tooltip-text")[num].innerHTML = "✅";           
            }
            document.getElementById("tooltip-text-id" + String(num)).style.display = "block";
            player_guessed_aud = new Audio('static/playerGuessed.mp3')
            player_guessed_aud.play();
          }
        }
      } else {
      }
    } 
    console.log('RATIO:')
    console.log(String(number_of_players) + "/" + String(nop))
    if(number_of_players == nop && guessmade == true) {
      socket.emit('finished-guessing', {
        bypass: true
      })
    }
})
// socket.on('guess2', function(data) {
  // multiplayer_guesses[data["username"]] = ["late"]
// })
socket.on('nop', function(data) {
  nop = data['nop']
})
function loadthepodium() {
  socket.emit('load-podium')
}
socket.on('finished-guessing', function(data) {
  guessmade = true
  clearInterval(downloadTimer)
  document.getElementById("spinner").style.display = "none";
  document.getElementById("eigth-card").style.display = "none";
  document.getElementById("id01").style.display = "block";
  map.invalidateSize();
  document.getElementById("main-button").style.display = "none";
  document.getElementById("main-button2").style.display = "none";
  document.getElementById("new-back-btn-time").style.countdown = "<i class='fas fa-stopwatch'></i>";
  document.getElementById("guess-button-id").style.display = "none";
  currentplayers = data["currentplayers"]
  transmit_json = currentplayers
  console.log(currentplayers)
  // sorting for round overview below
  if(marker1==undefined) {
    var greenmarkerIcon = L.ExtraMarkers.icon({
      icon: 'fa-check',
      markerColor: 'green',
      prefix: 'fa'
    });
    marker1 = L.marker([random_lat_lon[0], random_lat_lon[1]], {icon: greenmarkerIcon}).addTo(map);
    markerArray.push(marker1);
  }
  // marker_ex = marker1
    // markerArray.push(marker1.addTo(map));
  var items = Object.keys(transmit_json).map(function(key) {
    return [key, transmit_json[key][0], transmit_json[key][1], transmit_json[key][2], transmit_json[key][3],transmit_json[key][4],transmit_json[key][5],transmit_json[key][6]];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  console.log('MATCHED ITEMS FIRST ONE LOOK')
  var new_obj = items.slice(0, 10);
  console.log(new_obj)
  for(var iterate=0; iterate < 9; iterate++) {
    document.getElementsByClassName("tooltip-text")[iterate].style.display = "none";
  }
  player.mute();
  // unit = "mi"
  for(let x=0;x<new_obj.length;x++) {
    if(new_obj[x][2] != "") {
      distance_placeholder = String(new_obj[x][2])+String("mi")
      console.log('BEFORE: ' + distance_placeholder)
      if(unit == "km") {
        distance_placeholder = String(parseInt((parseInt(new_obj[x][2])*1.609).toFixed(1))) + "km"
        console.log('AFTER: ' + distance_placeholder)
      }
      document.getElementsByClassName("coolbob29")[x].innerHTML = String(new_obj[x][0]) + " <span style='font-size: 14px; color: lightgrey;'>("+distance_placeholder+")</span>"
      document.getElementsByClassName("upvote-downvote")[x].innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(new_obj[x][1])
    } else {
      distance_placeholder = String(new_obj[x][3])+String("mi")
      if(unit == "km") {
        distance_placeholder = String(parseInt((parseInt(new_obj[x][3])*1.609).toFixed(1))) + "km"
      }
      document.getElementsByClassName("coolbob29")[x].innerHTML = "<i class='far fa-hand-point-right' style='margin-right: 5px;'></i>" + String(new_obj[x][0]) + " <span style='font-size: 14px; color: lightgrey;'>("+distance_placeholder+")</span>"
      document.getElementsByClassName("upvote-downvote")[x].innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(new_obj[x][1])      
    }
    if(new_obj[x][6] == "away") {
      document.getElementsByClassName("coolbob29")[x].innerHTML = String(new_obj[x][0]) + " <span style='font-size: 14px; color: lightgrey;'>(No Guess)</span>"
      document.getElementsByClassName("upvote-downvote")[x].innerHTML = "<i class='fa fa-caret-down' aria-hidden='true' style='margin-right: 4px; color: red;'></i><span style='color: red;'>" + String(0) + "</span>"
    }
    if(new_obj[x][1] == "") {
      document.getElementsByClassName("coolbob29")[x].innerHTML = String(new_obj[x][0]) + " <span style='font-size: 14px; color: lightgrey;'>(No Guess)</span>"
      document.getElementsByClassName("upvote-downvote")[x].innerHTML = "<i class='fa fa-caret-down' aria-hidden='true' style='margin-right: 4px; color: red;'></i><span style='color: red;'>" + String(0) + "</span>"
    // document.getElementById("map-prompter").innerHTML = "Intermission... <i class='far fa-clock fa-spin'></i>"
    }
      document.getElementsByClassName("br-tag")[x].style.display = "block";
      document.getElementsByClassName("coolbob29")[x].style.display = "block";
      document.getElementsByClassName("upvote-downvote")[x].style.display = "block";
  }
  audio_play = new Audio('static/roundEndSuccess.mp3')
  audio_play.play();
  document.getElementById("map-prompter").innerHTML = "Intermission... <i class='far fa-clock fa-spin'></i>"
  $("#seventh-card").slideDown(700);

  for(var iterate=0; iterate < nop.length; iterate++) {
    document.getElementsByClassName("tooltip-text")[i].style.display = "none";
  }






  // does sorting for leaderboard and maps below (leaderboad mainly)
  var items = Object.keys(transmit_json).map(function(key) {
    return [key, transmit_json[key][0], transmit_json[key][1], transmit_json[key][2], transmit_json[key][3],transmit_json[key][4],transmit_json[key][5],transmit_json[key][6]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  console.log('MATCHED ITEMS')
  var new_obj = items.slice(0, 10);
  console.log(new_obj)
  for(let x=0;x<new_obj.length;x++) {
    console.log(new_obj[x][0])
    document.getElementsByClassName("li-class")[x].style.display = "block";
    document.getElementsByClassName("user-name-score")[x].innerHTML = String(new_obj[x][4])
    document.getElementsByClassName("user-name-ll")[x].innerHTML = String(new_obj[x][0])
    document.getElementsByClassName("li-circles")[x].style.backgroundColor = String(new_obj[x][5])
    console.log('color is: ' + String(new_obj[x][5]))
    console.log('Finished')
    console.log('THIS THING RAN!!')
    if(new_obj[x][2] != "" && new_obj[x][6] != "away") {
    console.log('running..')
    yellowMarker = L.ExtraMarkers.icon({
      icon: 'fa-question',
      markerColor: String(new_obj[x][5]),
      prefix: 'fa'
    });
    current_marker_push = L.marker(new_obj[x][3], {icon: yellowMarker}).bindPopup("<b>" + String(new_obj[x][0]) + "'s guess.</b><br>" + String(new_obj[x][2]) + "mi" + " <span style='font-size: 10.5px;'>(" + String(parseInt(parseInt(new_obj[x][2])*1.609)) + "km)</span>", {
      sticky: true,
      autoClose: false
    })
    console.log('Marker Array Below Push')
    markerArray.push(current_marker_push.addTo(map));
    var polyline_new = L.polyline([data["correctLatLon"], new_obj[x][3]], {color: 'black', dashArray: '5,10'}).addTo(map);
    markerArray.push(polyline_new.addTo(map))
    // current_marker_push.openPopup();
    }
  }
  if(round_present == 8) {
    loaded_podium = true;
    document.getElementById("player-stats").innerHTML = "Game Over!"
    document.getElementById("round-done").innerHTML = "The final result's are in. Click the button to see the final results."
    document.getElementById("end-game-button").innerHTML = "See Podium!"
    document.getElementById("end-game-button").onclick = loadthepodium()
    player.mute();
    for(let num=0;num<10;num++) {
    document.getElementsByClassName("br-tag")[num].style.display = "none";
    document.getElementsByClassName("coolbob29")[num].style.display = "none";
    document.getElementsByClassName("upvote-downvote")[num].style.display = "none";
    }
    $("#seventh-card").slideDown(700);
    document.getElementById("ninth-card").style.display = "none";
    map.fitBounds(L.featureGroup(markerArray).getBounds().pad(1));
    return;
  }
  console.log('why does this run so much')
  document.getElementsByClassName("li-class")[new_obj.length-1].style.borderBottom = "none";
  map.fitBounds(L.featureGroup(markerArray).getBounds().pad(1));
    document.getElementById("spinner2").style.display = "none";
          timeleft2 = 21
          // timeleft2 = 90
          // started_playing = 1;
              document.getElementById("ninth-card").style.display = "block";
              document.getElementById("ninth-center").innerHTML = timeleft2 + 's';
              timeleft2 -= 1;
              randomTimer = setInterval(function(){
                if(timeleft2 <= 0){
                  document.getElementById("ninth-center").innerHTML = "0s";
                  clearInterval(randomTimer);
                  console.log('finished..')
                  document.getElementById("spinner2").style.display = "block"
                  document.getElementById("ninth-card").style.display = "none"
                } else {
                  document.getElementById("ninth-center").innerHTML = timeleft2 + 's';
                }
                if(timeleft2 == 0) {
                  rannum = Math.floor(Math.random()*usa_lst.length)+1
                  socket.emit("next_round", {
                    // video: usa_lat_lon[rannum],
                    // rannum: rannum
                  })
                }
                timeleft2 -= 1;
              }, 1000);
if (localStorage.getItem("pro-tip1") === null) {
  document.getElementById("tenth-card").style.display = "block";
  localStorage.setItem("pro-tip1", "abc")
}
})
$("#new-back-btn7").on("mouseover", function () {
  $("#new-back-btn-time").hide()
});
$("#new-back-btn8").on("mouseleave", function () {
  // if(country_streak != 0 && which_selected != "accuracy") {
    $("#new-back-btn-time").show()
  // }
});
socket.on('load-podium', function(data) {
  loaded_podium = true;
  player.mute();
  player.pauseVideo();
  transmit_json = data["currentplayers"]
  // document.getElementsById("vid-bac").style.display = "none";
  document.get
  var items = Object.keys(transmit_json).map(function(key) {
    console.log(key)
    console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5],transmit_json[key][6]];
  });
  items.sort(function(first, second) {
    return second[3] - first[3];
  });
  console.log('PODIUM ITEMS')
  const pod_obj = items.slice(0, 10);
  console.log(pod_obj)
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  // console.log(new_obj)
  document.getElementsByTagName("nav")[0].style.position = "fixed";
  document.getElementsByTagName("nav")[0].style.width = "100vw";
  sum_of_scores = 0;
  for(let obj_p = 0; obj_p < pod_obj.length; obj_p++) {
    try {
      document.getElementsByClassName("scoreboard__item")[obj_p].style.display = "block";
      document.getElementsByClassName("scoreboard__title")[obj_p].innerHTML = pod_obj[obj_p][0]
      // document.getElementsByClassName("js-number")[obj_p].innerHTML = String(pod_obj[obj_p][4])
      console.log(document.getElementsByClassName("user-name-score")[obj_p].innerHTML)
      document.getElementsByClassName("js-number")[obj_p].innerHTML = pod_obj[obj_p][3]
      sum_of_scores += parseInt(pod_obj[obj_p][3])
      if(obj_p == 0) {
        document.getElementsByClassName("podium-name-first")[0].innerHTML = "<i class='fas fa-medal' style='color: #ebc137;'></i> " + String(pod_obj[obj_p][0])
        // document.getElementsByClassName("podium-num-first")[0].innerHTML = document.getElementsByClassName("user-name-score")[0].innerHTML | pod_obj[obj_p][4]
        animateValue("podium-num-first", 0, pod_obj[obj_p][3], 2000, 0);
        document.getElementsByClassName("first-place")[0].style.display = "block"
      } else if (obj_p == 1) {
        document.getElementsByClassName("podium-name-second")[0].innerHTML = String(pod_obj[obj_p][0])
        // document.getElementsByClassName("podium-num-second")[0].innerHTML = String(pod_obj[obj_p][4])
        document.getElementsByClassName("second-place")[0].style.display = "block"
        animateValue("podium-num-second", 0, pod_obj[obj_p][3], 2000, 0);
      } else if (obj_p == 2) {
        document.getElementsByClassName("podium-name-third")[0].innerHTML = String(pod_obj[obj_p][0])
        document.getElementsByClassName("podium-num-third")[0].innerHTML = String(pod_obj[obj_p][3])
        document.getElementsByClassName("third-place")[0].style.display = "block"
          animateValue("podium-num-third", 0, pod_obj[obj_p][3], 2000, 0);

      } else {
        console.log('else bud')
      }
    } catch {

    }
  }
  sum = sum_of_scores
  console.log(sum_of_scores)
  document.getElementById("vid-bac").style.display = "none";
  document.getElementById("new-back-btn-end").style.display = 'block';
          player_guessed_aud = new Audio('static/playerGuessed.mp3')
          player_guessed_aud.play();
  for(var count=0; count<10;count++) {
    console.log(count)
    if(String(document.getElementsByClassName("user-name-ll")[count].innerHTML) == String(data["username"])) {
      place = count+1
      document.getElementsByClassName("scoreboard__title")[count].innerHTML = "<i class='far fa-hand-point-right' style='margin-right: 5px;'></i> " + String(document.getElementsByClassName("scoreboard__title")[count].innerHTML)
      if(place == 1) {
        place = "1st"
      } else if (place == 2) {
        place = "2nd"
      } else if(place == 3) {
        place = "3rd"
      } else {
        place = String(place) + "th"
      }
      console.log('THE PLACE: ' + String(place))
      document.getElementById('place-number').innerHTML = place
      break;
    }
  }
  // goez();
  distance_average = myguessdistances.reduce((a, b) => a + b, 0)
  distance_average = distance_average/distance_average.length
  // socket.emit("disconnect-socket")
  goez();
  document.getElementsByTagName("nav")[0].style.zIndex = "1000000000000";
  socket.disconnect();


})
function roomchoice(){
  document.getElementById("fifth-card").style.display = 'none';
  document.getElementById("choice-card").style.display = 'block';
}
var card_selected = 1
function cardx(num) {
  // console.log('run')
  if(num == 1) {
    document.getElementsByClassName("cardx")[0].style.boxShadow = "0 0 5px rgba(92,184,92,1)"
    document.getElementsByClassName("cardx")[1].style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,96,246,0.23)"
    card_selected = 1
  } else {
    document.getElementsByClassName("cardx")[1].style.boxShadow = "0 0 5px rgba(92,184,92,1)"
    document.getElementsByClassName("cardx")[0].style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,96,246,0.23)"
    card_selected = 2
  }
}
socket.on('profanity', function() {
  alert("We detected profanity in your username!")
  document.getElementById("fifth-button").innerHTML = "Join Room Again"
  document.getElementById("second-card").style.display = "block";
  document.getElementById("sixth-card").style.display = "none";
})

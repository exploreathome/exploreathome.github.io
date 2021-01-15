var emitted_reload = 0;
// var thing = things[Math.floor(Math.random()*things.length)];
// console.log(timelimit)
var timelimit = "";
var currentusername = "";
var random_room_id;
var marker1;
var exist_error_check;
var socket;
var audio_play = new Audio();
// var group;
// Make connection
// var socket = io.connect('http://localhost:5000');
var socket = io.connect("https://testapp149.herokuapp.com/");
var hostornot = false;
// var socket = io.connect('http://testapp149.herokuapp.com/');
window.addEventListener("focus", () => socket.connect());

function initiateconnect(random_room_id) {
  console.log(socket.connected)
  console.log('test')
  // var socket = io.connect('http://localhost:5000');
  currentusername = document.getElementById("inputUsername").value;
  if(currentusername.length == 0) {
    alert("You forgot to enter a username!")
    return;
  }
  if(currentusername.length >= 14) {
    alert("Too many letters!")
    return;
  }
  if(socket.connected != true) {
    document.getElementById("sharelink").innerHTML = "One second! <i class='fas fa-spinner fa-spin' style='margin-left: 5px;'></i>"
    setTimeout(function() {
      alert("We just restarted our game-servers when you joined. Reload the page and everything will be okay. Sorry for the inconvinience.")
      location.reload();
    }, 10000)
    return;
  }
  localStorage.setItem("my_username", currentusername)
  hostornot = true;
  document.getElementById("third-card").style.display = "none";
  document.getElementById("fourth-card").style.display = "block";
  // socket = io.connect('http://localhost:5000');
  timelimit = document.getElementById("form-number-1").value;
  document.getElementById("tpg").innerHTML = String(timelimit)
  document.getElementById("pl").innerHTML = String(document.getElementById("form-number-3").value)

  // console.log(currentusername.length)
  // console.log('-')
  // console.log(currentusername)
  myusername = currentusername;
  if(currentusername == undefined) {
    currentusername = things[Math.floor(Math.random()*things.length)];
    console.log('hey hey hey')
  }
  console.log(timelimit)
  random_room_id = random_room_id
  if(emitted_reload == 0) {
    console.log(socket.id)
    emitted_reload = 1
    socket.emit('create_room', {
      time: String(timelimit)[0],
      // player_lim: String(document.getElementById("form-number-2").value),
      username: currentusername,
      user_id_1: socket.id,
      room_id: random_room_id
    });
    console.log(random_room_id)
  }
  document.getElementById("linkInput").value = "https://virtualvacation.us/multiplayer?" + random_room_id
  document.getElementById("custom-code").innerHTML = String(random_room_id)
  player.playVideo();
  audio_play.play();
}
var myusername;
function joinroom(room_id, username, userid) {
    // var socket = io.connect('http://localhost:5000');
    if(username.length == 0) {
      alert("You forgot to enter a username!")
      return;
    }
    console.log(room_id)
    console.log(username)
    console.log(userid)
    currentusername = username;
    myusername = username;
    console.log('room joined')
    exist_error_check = 0;
    socket.emit('join_room', {
      room_id: String(room_id),
      username: String(username),
      userid: String(userid)
    });
    sixth()
    if(document.getElementById("form-number-1").value = "Kilometres") {
      unit = "km"
      localStorage.setItem("unit", "km")
    } else {
      unit = "mi"
      localStorage.setItem("unit", "mi")
    }
    player.playVideo();
    audio_play.play();
}
var globalcolor = "red";
socket.on('color-change', function(data) {
  globalcolor = data["color"]
})
socket.on('user-join', function(data){
  console.log('user-join initiate')
  console.log(data["room_list"])
  num_of_players = 0;
  for (var key in data["room_list"]){
    num_of_players++
    console.log(num_of_players)
  }
  document.getElementById("playersWaiting").innerHTML = num_of_players
  document.getElementById("usernameList").innerHTML = String(document.getElementById("usernameList").innerHTML) + ", " + String(data["username"])
  if(hostornot == true) {
    var room_join_sound = new Audio('static/playerGuessed.mp3');
    room_join_sound.play();
  }
  // console.log(document.getElementById("usernameList").innerHTML)
  // console.log('fart')
    // console.log('detectedchat')
    // feedback.innerHTML = '';
    // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('change-num-of-players', function(data) {
  console.log('CHANGING NUM OF PLAYERS')
  console.log(data['room_list'])
  // if(videoloadfuncran == 1) {
  player_string = ""
  num_of_players = 0;
  for (var key in data["room_list"]){
    console.log(key.nickname)
    num_of_players++
    console.log(num_of_players)
    if(String(socket.id) == String(key)) {
      player_string += "You"
    } else {
      player_string += ", " + String(data["room_list"][key])
    }
  }  
  console.log(player_string)
  document.getElementById("usernameList").innerHTML = player_string
  // num_of_players -= 1
  document.getElementById("playersWaiting").innerHTML = num_of_players
                // if(map != undefined && inguessingstage == 0) {
                //   if(guessmade == true) {
                //     socket.emit('current_score', {
                //       current_score: current_grade,
                //       guessing_point: [globallat, globallon],
                //       distance_between: distance_between,
                //       ran_out_of_time: false,
                //       intentional_exit: true,
                //       forced: false
                //     })                    
                //   }
                // }   
})
let current_players = {}
socket.on('lobby', function(data){
  console.log('runs')
  console.log(data)
  console.log(data["host_id"])
    current_players[data["host_id"]] = [data["host_name"]]
  console.log(data["room_list"])
  num_of_players = 0;
  for (var key in data["room_list"]){
    num_of_players++
    console.log(num_of_players)
    // document.getElementById("usernameList").innerHTML = document.getElementById("usernameList").innerHTML + " " + data["room_list"].name
    // check if the property/key is defined in the object itself, not in parent
    // if (dictionary.hasOwnProperty(key)) {           
        // console.log(key, dictionary[key]);
    // }
  }
  document.getElementById("playersWaiting").innerHTML = num_of_players
  // document.getElementById("tpg").innerHTML= data["host_chose_time"]
  // document.getElementById("pl").innerHTML= data["host_chose_player_count"]
});
var active_json = {

}
var serverleft;
var gamenotified = 0;
socket.on('start-game-notify', function(data){
  console.log('Start Game Notified Initiate')
  console.log(data)
  console.log(data["player_info"])
  round_total = data["rounds"]
  serverleft = 90;
  if (data["t_p_g"] == "1 minute 30 seconds") {
    console.log(' i am cool')
    serverleft = 90;
  } else if(data["t_p_g"] == "1 minute") {
    serverleft = 60
  } else if(data["t_p_g"] == "2 minutes") {
    console.log('im here')
    serverleft = 120
  } else if(data["t_p_g"] == "3 minutes") {
    serverleft = 180
  } else if(data["t_p_g"] == "4 minutes") {
    serverleft = 240
  } else if(data["t_p_g"] == "5 minutes") {
    serverleft = 300
  }
  if(data["t_p_g"] == "15 seconds") {
    serverleft = 15;
  }
  round_present = data["current_round"]
  player.mute();
  loadVideoWithId("wor", data['random_num']);
  document.getElementsByClassName("demo")[0].style.display = 'block'
  document.getElementsByClassName("demo")[0].style.zIndex = 1234
  $("#demo-back").slideDown(350);
  setTimeout(function() {
              $("#demo-back").slideUp(350);
              player.unMute();
              // player.playVideo();
              document.getElementsByClassName("demo")[0].style.display = 'none'
  }, 4000)
            console.log('before sound played')
            var start_sound = new Audio('static/gamestartnotif.mp3');
            start_sound.play();
            console.log('sound able to be played')
              timeleft = serverleft
            setTimeout(function() {
                player.unMute();
              downloadTimer = window.setInterval(function(){

                if(timeleft <= 0){
                  // document.getElementById("surround-spinner").style.display = 'block';
                  document.getElementById("svg-spinner").style.display = 'block';
                  document.getElementById("spinner").style.display = 'block';
  // $("#spinner").slideDown(700);
                  // document.getElementById("spinner").style.display = "block";
                  // document.getElementById('guess-button-id').style.display = "none";
                  // document.getElementById("vid-bac").style.pointerEvents = 'none';
                  // document.getElementById()
                  document.getElementById("countdown").innerHTML = "0s";
                  // document.getElementById("countdown").style.color = "white";
                  // try {
                      // socket.emit('current_score', {
                      // current_score: current_grade,
                      // guessing_point: [globallat, globallon],
                      // distance_between: distance_between,
                      // ran_out_of_time: false
                    // })
                    // } catch {
                  clearInterval(downloadTimer);

                  // console.log('makeaguessran')
                  // player.mute();
                  // if(guessmade == false) {
                  //   ranoutoftime = true;
                  //   makeaguess()
                  // } else if(guessmade == true) {
                  //   socket.emit('current_score', {
                  //     current_score: current_grade,
                  //     guessing_point: [globallat, globallon],
                  //     distance_between: distance_between,
                  //     ran_out_of_time: false,
                  //     forced: true,
                  //     intentional_exit: false
                  //   })                    
                  // }
                  // // waitmessage = serverleft +5;
                  // // console.log(waitmessage)
                  // if(is_host == 1 && inguessingstage == 0) {
                  //   setTimeout(function() {
                  //     console.log("SENDING THIS MESSAGE!")
                  //     socket.emit('force-guess', {

                  //     })
                  //   }, 5000)
                  // }
                // }
                } else {
                  document.getElementById("countdown").innerHTML = timeleft + 's';
                }
                if(timeleft <= 10) {
                  // document.getElementById("countdown").style.color = "red";
                  audio_play.src = 'static/tick.mp3'
                  audio_play.play();
                }
                timeleft -= 1;
              }, 1000);
            }, 4000)
  // console.log(data["room_contents"])
  // room_contents = data["room_contents"]
  // user_length = room_contents.length;
  // console.log(user_length)
  // player_info = data["player_info"]
  // leaderboardcount(user_length)
  // iteration = 0
  // game
  // if(gamenotified == 0) {
    room_contents = data["room_contents"]
    // user_length = room_contents.length;
    user_length = Object.keys(room_contents.sockets).length
    // console.log(user_length)
    player_info = data["player_info"]
    // console.log(room_contents)
    // console.log('LEADERBOARD COUNT: ' + String(user_length))
    // console.log(room_contents.sockets)
    // console.log(Object.keys(room_contents.sockets).length)
    leaderboardcount(user_length)
    iteration = 0
      var items = Object.keys(player_info).map(function(key) {
    // console.log(key)
    // console.log(transmit_json[key][2])
    return [key, player_info[key][0], player_info[key][1], player_info[key][2]];
  });
  items.sort(function(first, second) {
    return second[2] - first[2];
  });
  console.log('MATCHED ITEMS PLAYER INFO')
  const pinfoobj = items.slice(0, 5);
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  console.log(pinfoobj)
  for(let ione = 0; ione < pinfoobj.length; ione++) {
      document.getElementsByClassName("user-name-ll")[ione].innerHTML = pinfoobj[ione][1];
      document.getElementsByClassName("user-name-score")[ione].innerHTML = pinfoobj[ione][2]; 
      document.getElementsByClassName("li-circles")[ione].style.backgroundColor = pinfoobj[ione][3];
      console.log("COLORS HELP")
      gamenotified = 1;   
  }
    // for (var key in player_info) {
    //   key_name = key
    //   key_value = player_info[key];
    //   console.log(key_name, key_value)
    //   document.getElementsByClassName("user-name-ll")[iteration].innerHTML = key_value[0];
    //   document.getElementsByClassName("user-name-score")[iteration].innerHTML = key_value[1];
    //   // console.log()
    //   console.log("iteration of dict.. 18")
    //   iteration += 1
    //   gamenotified = 1;
    //   // your code here...
    // }
  // }
  console.log(player_info)
  for(let i=3; i>=0; i--) {
    console.log('runnin this')
    // document.getElementsByClassName("li-class2")[i].style.borderBottom = "thin solid rgba(255, 255, 255, 0.6)"
    if(document.getElementsByClassName("li-class2")[i].style.display == "none") {
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "Round Started <i class='fas fa-check' style='color: #5cb85c; margin-left: 2px;'></i>"
      // document.getElementsByClassName("li-class2")[i].style.borderBottom = "none"
      document.getElementsByClassName("li-class2")[i].style.display = "block"
      document.getElementById("new-back-btn10").style.display = 'block'
        // for(let y=3; y>=0; y--) {
    // if(document.getElementsByClassName("li-class2")[y-1].style.display != "block") {
      // document.getElementsByClassName("li-class2")[y].style.borderBottom = "none";     
    // }
  // }
      return; 
    }
  }
  console.log(document.getElementsByClassName("user-name-ll2")[3].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[2].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[1].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[0].innerHTML)
  console.log('switching process intiateed')
  document.getElementsByClassName("user-name-ll2")[3].innerHTML = document.getElementsByClassName("user-name-ll2")[2].innerHTML
  document.getElementsByClassName("user-name-ll2")[2].innerHTML = document.getElementsByClassName("user-name-ll2")[1].innerHTML
  document.getElementsByClassName("user-name-ll2")[1].innerHTML = document.getElementsByClassName("user-name-ll2")[0].innerHTML
  document.getElementsByClassName("user-name-ll2")[0].innerHTML = "Round Started <i class='fas fa-check' style='color: #5cb85c; margin-left: 2px;'></i>"
});
var firsttime = 0;
socket.on('finished-guessing', function(data){
  player.mute();
  clearInterval(downloadTimer);
  document.getElementById("countdown").innerHTML = "0s"
  inguessingstage = 1;
                    document.getElementById("svg-spinner").style.display = 'none';
                  document.getElementById("spinner").style.display = "none";
                  document.getElementById("main-button").style.display = "none";
                  document.getElementById("main-button2").style.display = "none";
                  document.getElementById("future-c").style.display = "block";
  document.getElementById('eigth-card').style.display = 'none';
  console.log('message recieved IN FINISHED GUESSINGGGGGG')
  transmit_json = data['transmit_json']
  console.log(transmit_json)
  guess_coord_list = []
  // document.getElementById("waiting-for-all").style.display = "none";

  document.getElementById("future-cclose-button-id").style.display = "block";
  // if(is_host == 1) {
    document.getElementById("skip-button-id").style.display = "none";
    document.getElementById("original-c").style.display = "none";
  // }
  current_i = 0
  var items = Object.keys(transmit_json).map(function(key) {
    console.log(key)
    console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  console.log('MATCHED ITEMS')
  const new_obj = items.slice(0, 5);
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  console.log(new_obj)
  // var coolbobclasses = startElem.getElementsByClassName("coolbob29");
  for (var p = 9; p--;) {
    document.getElementsByClassName("br-tag")[p].style.display = "none";
  }
  for(let obj_i = 0; obj_i < new_obj.length; obj_i++) {
    // console.log()
    // if(new_obj[obj_i][3] != null) {
    document.getElementsByClassName("br-tag")[obj_i].style.display = "block";
    document.getElementsByClassName("coolbob29")[obj_i].style.display = "block";
    console.log(String(new_obj[obj_i][1]))
    if(String(new_obj[obj_i][1] == 'null')) {
      console.log('Hey!')
    }
    // console.log()
    if(String(new_obj[obj_i][1]) != "0" && String(new_obj[obj_i][1]) != 'null') { 
    console.log('Hey2!')
    document.getElementsByClassName("upvote-downvote")[obj_i].innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(new_obj[obj_i][1])
    if(String(new_obj[obj_i][2]) != currentusername) {
      document.getElementsByClassName("coolbob29")[obj_i].innerHTML = String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>("+String(new_obj[obj_i][3])+"mi)</span>"
    } else {
      document.getElementsByClassName("coolbob29")[obj_i].innerHTML = "<i class='far fa-hand-point-right' style='margin-right: 5px;'></i>" + String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>("+String(new_obj[obj_i][3])+"mi)</span>"
    }
    }else{
    console.log('this is running1234')
    document.getElementsByClassName("coolbob29")[obj_i].innerHTML = String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>(No Guess)</span>"
    document.getElementsByClassName("upvote-downvote")[obj_i].innerHTML = "<i class='fa fa-caret-down' aria-hidden='true' style='margin-right: 4px; color: red;'></i><span style='color: red;'>" + String(0) + "</span>"
    document.getElementsByClassName("br-tag")[obj_i].style.display = "block";
    document.getElementsByClassName("coolbob29")[obj_i].style.display = "block";
    document.getElementsByClassName("upvote-downvote")[obj_i].style.display = "block";
    }
    document.getElementsByClassName("upvote-downvote")[obj_i].style.display = "block";
    document.getElementsByClassName("user-name-ll")[obj_i].innerHTML = String(new_obj[obj_i][2])
    document.getElementsByClassName("user-name-score")[obj_i].innerHTML = String(new_obj[obj_i][4])
    console.log('My Socket Id: ' + socket.id)
    if(socket.id == String(new_obj[obj_i][5])) {
      console.log(' i am the host... ')
      document.getElementById("guess-button-id-host").style.display = 'block';
      document.getElementById("future-c").style.display = 'block';
      console.log('yes is host')
    }
    // }
  }
  audio_play.src = 'static/roundEndSuccess.mp3'
  audio_play.play();
  $("#seventh-card").slideDown(700);
  document.getElementById("id01").style.display = 'block';
  // abc
    //     if (map == undefined) {
    //       console.log(' Map is actually undefined')
    //   map = L.map('mapid', {minZoom: 1, layers: [gray_scale, osm_scale]}).setView([42.35, -71.08], 3);
    //     var differentLayers = {
    //       "<b>1. </b>All English": gray_scale,
    //       "<b>2.</b> Native Languages": osm_scale
    //     };
    //   L.control.layers(differentLayers).addTo(map);
    // } else {
    //   console.log(" is undefined ")
    // }
  noguesscount = 0;
  realguesscount=0;
  var items = Object.keys(transmit_json).map(function(key) {
    console.log(key)
    console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  console.log('MATCHED ITEMS-2')
  const new_obj2 = items.slice(0, 5);
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  console.log(new_obj2)
  for(let obj_i = 0; obj_i < new_obj2.length; obj_i++) {
    document.getElementsByClassName("user-name-ll")[obj_i].innerHTML = String(new_obj2[obj_i][2])
    document.getElementsByClassName("user-name-score")[obj_i].innerHTML = String(new_obj2[obj_i][4])
  }
  console.log(new_obj2.length)
  obj2_length = new_obj2.length
  leaderboardcount(obj2_length)
  map.invalidateSize();
  for (var key in transmit_json) {
    // console.log('KEY IN:')
    // console.log(transmit_json[key])
    temp_color = transmit_json[key][7]
    realguesscount+=1
    key_id = key
    score_coord_info = transmit_json[key];
    console.log(key_id, score_coord_info)
    guess_coord_list.push(score_coord_info[1])
    console.log(score_coord_info[1])
    console.log([globallat, globallon])

    current_i += 1

    if(score_coord_info[1][0] != globallat) {
      console.log('RANNNN')
      //create markers and polyline
  var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-times',
    markerColor: 'red',
    prefix: 'fa'
  });
  var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-check',
    markerColor: 'green',
    prefix: 'fa'
  });
  console.log('Color: ' + String(score_coord_info[6]))
  console.log(score_coord_info)
  var yellowMarker = L.ExtraMarkers.icon({
    icon: 'fa-user-times',
    markerColor: temp_color,
    prefix: 'fa'
  });
    console.log(redMarker)
    console.log('scorecoord')
    console.log(score_coord_info)
    if(score_coord_info[1] != "away") {
      console.log('THIS THING RAN!!')
    current_marker_push = L.marker(score_coord_info[1], {icon: yellowMarker}).bindPopup("<b>" + String(score_coord_info[2]) + "'s guess.</b><br>" + String(score_coord_info[3]) + "mi" + " <span style='font-size: 10.5px;'>(" + String(parseInt(parseInt(score_coord_info[3])*1.609)) + "km)</span>", {
  sticky: true,
  autoClose: false
})
    console.log('Marker Array Below Push')
    markerArray.push(current_marker_push);


          marker1 = L.marker([random_lat_lon[0], random_lat_lon[1]], {icon: greenMarker})
          markerArray.push(marker1);
    var group = L.featureGroup(markerArray).addTo(map);
      if(obj2_length < 3) {
        current_marker_push.openPopup();
      }
      var polyline_new = L.polyline([random_lat_lon, score_coord_info[1]], {color: 'black', dashArray: '5,10'}).addTo(map);
      markerArray.push(polyline_new)
        console.log(guess_coord_list)
          try {
                      map.removeLayer(marker)
                      console.log('THIS WORKEDD YAYYY!!')
          } catch {
            console.log('catched occured!!!@!@!')
          }
              feature__group = new L.featureGroup(markerArray);
              console.log(feature__group)
    map.flyToBounds(feature__group.getBounds().pad(1));
    console.log('i iterated...')
    } else {
          noguesscount++
          console.log('else initiated!!')
          marker1 = L.marker([random_lat_lon[0], random_lat_lon[1]], {icon: greenMarker})
          markerArray.push(marker1);
          var group = L.featureGroup(markerArray).addTo(map);
          try {
                      map.removeLayer(marker)
                      console.log('THIS WORKEDD YAYYY!!')
          } catch {
            console.log('catched occured!!!@!@!')
          }
    }
    feature__group = new L.featureGroup(markerArray);
    console.log(feature__group)
    map.fitBounds(L.featureGroup(markerArray).getBounds().pad(1));
    console.log('i iterated... 321')
    if(realguesscount == noguesscount) {
      console.log('set the zoom')
      map.setZoom(5);
    }
    } 
  }

    map.invalidateSize();
  firsttime = 1;
  for(var t=0;t<10;t++) {
    document.getElementsByClassName("tooltip-text")[t].style.display = "none";
  }
  // for(var iterate=0; iterate < nop.length; iterate++) {
  //   document.getElementsByClassName("tooltip-text")[i].style.display = "none";
  // }
  if (localStorage.getItem("pro-tip1") === null) {
    document.getElementById("tenth-card").style.display = "block";
    localStorage.setItem("pro-tip1", "abc")
  }
    for(let i=3; i>=0; i--) {
    // document.getElementsByClassName("li-class2")[i].style.borderBottom = "thin solid rgba(255, 255, 255, 0.6)"
    if(document.getElementsByClassName("li-class2")[i].style.display == "none") {
      console.log('is none')
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "Round Over <i class='far fa-clock' style='color: #d9534f; margin-left: 2px;'></i> "
      // document.getElementsByClassName("li-class2")[i].style.borderBottom = "none"
      document.getElementsByClassName("li-class2")[i].style.display = "block"
      document.getElementById("new-back-btn10").style.display = 'block'
      return; 
    }
  }
  console.log('switching process intiateed')
  document.getElementsByClassName("user-name-ll2")[3].innerHTML = document.getElementsByClassName("user-name-ll2")[2].innerHTML
  document.getElementsByClassName("user-name-ll2")[2].innerHTML = document.getElementsByClassName("user-name-ll2")[1].innerHTML
  document.getElementsByClassName("user-name-ll2")[1].innerHTML = document.getElementsByClassName("user-name-ll2")[0].innerHTML
  document.getElementsByClassName("user-name-ll2")[0].innerHTML = "Round Over <i class='far fa-clock' style='color: #d9534f; margin-left: 2px;'></i> "
    setTimeout(function(){ map.invalidateSize()}, 500);
});
let num_of_players = 0

function leaderboardcount(num_of_lines) {
    document.getElementsByClassName("li-class")[0].style.display = "none";
    document.getElementsByClassName("li-class")[1].style.display = "none";
    document.getElementsByClassName("li-class")[2].style.display = "none";
    document.getElementsByClassName("li-class")[3].style.display = "none";
    document.getElementsByClassName("li-class")[4].style.display = "none";
    document.getElementsByClassName("li-class")[5].style.display = "none";
    document.getElementsByClassName("li-class")[6].style.display = "none";
    document.getElementsByClassName("li-class")[7].style.display = "none";
    document.getElementsByClassName("li-class")[8].style.display = "none";
    document.getElementsByClassName("li-class")[9].style.display = "none";
    // document.getElementsByClassName("li-class")[10].style.display = "none";

    // document.getElementsByClassName("li-class")[i].style.display = "block";
  for(let i=0;i<num_of_lines;i++) {
    console.log(i)
    document.getElementsByClassName("li-class")[i].style.display = "block";
  }
  document.getElementsByClassName("li-class")[num_of_lines-1].style.borderBottom = "none"
}
// leaderboardcount(5)

$("#new-back-btn7").on("mouseover", function () {
  $("#new-back-btn-time").hide()
});
$("#new-back-btn8").on("mouseleave", function () {
  $("#new-back-btn-time").show()
});

function copyToClip() {
  var copyText = document.getElementById("linkInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  document.getElementById("copyLink").innerHTML = "Copied! <i class='fa fa-check' aria-hidden='true' style='margin-left: 10px; font-size: 20px;''></i>"
}
var is_asdfasdfasdf;
var is_host = 0;
function begingame() {
    console.log(socket.id)
    console.log('Round Present:')
    console.log(round_present+1)
    is_host = 1;
    is_asdfasdfasdf = 1;
    console.log('EMITTED BEIGN GAME')
    socket.emit('begin_game', {
      user_socket_id: socket.id,
      // player_limit: document.getElementById("form-number-2").value,
      time_per_guess: document.getElementById("form-number-1").value,
      rounds: document.getElementById("form-number-3").value,
      host_round: round_present+1,
      user_random: "hello world"
    });
}
function loadpodium() {
  player.mute();
  podium_json = transmit_json
  console.log('Podium Json:')
  console.log(podium_json)
  var items = Object.keys(transmit_json).map(function(key) {
    console.log(key)
    console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  console.log('PODIUM ITEMS')
  const pod_obj = items.slice(0, 5);
  console.log(pod_obj)
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  // console.log(new_obj)
  sum_of_scores = 0;
  for(let obj_p = 0; obj_p < pod_obj.length; obj_p++) {
    try {
      document.getElementsByClassName("scoreboard__item")[obj_p].style.display = "block";
      document.getElementsByClassName("scoreboard__title")[obj_p].innerHTML = pod_obj[obj_p][2]
      // document.getElementsByClassName("js-number")[obj_p].innerHTML = String(pod_obj[obj_p][4])
      console.log(document.getElementsByClassName("user-name-score")[obj_p].innerHTML)
      document.getElementsByClassName("js-number")[obj_p].innerHTML = pod_obj[obj_p][4]
      sum_of_scores += parseInt(pod_obj[obj_p][4])
      if(obj_p == 0) {
        document.getElementsByClassName("podium-name-first")[0].innerHTML = "<i class='fas fa-medal' style='color: #ebc137;'></i> " + String(pod_obj[obj_p][2])
        // document.getElementsByClassName("podium-num-first")[0].innerHTML = document.getElementsByClassName("user-name-score")[0].innerHTML | pod_obj[obj_p][4]
        animateValue("podium-num-first", 0, pod_obj[obj_p][4], 2000, 0);
        document.getElementsByClassName("first-place")[0].style.display = "block"
      } else if (obj_p == 1) {
        document.getElementsByClassName("podium-name-second")[0].innerHTML = String(pod_obj[obj_p][2])
        // document.getElementsByClassName("podium-num-second")[0].innerHTML = String(pod_obj[obj_p][4])
        document.getElementsByClassName("second-place")[0].style.display = "block"
        animateValue("podium-num-second", 0, pod_obj[obj_p][4], 2000, 0);

    // jQuery({someValue: 10}).animate({someValue: parseInt(pod_obj[obj_p][4])}, {
    // duration: 1500,
    // easing:'swing', // can be anything
    // step: function() { // called on every step
    //     // Update the element's text with rounded-up value:
    //     document.getElementsByClassName("podium-num-second")[0].innerHTML = String(this.someValue)
    //     // $('.upvote-downvote')[obj_i].text("<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + this.someValue);
    // }
    // });

      } else if (obj_p == 2) {
        document.getElementsByClassName("podium-name-third")[0].innerHTML = String(pod_obj[obj_p][2])
        document.getElementsByClassName("podium-num-third")[0].innerHTML = String(pod_obj[obj_p][4])
        document.getElementsByClassName("third-place")[0].style.display = "block"
          animateValue("podium-num-third", 0, pod_obj[obj_p][4], 2000, 0);
    // jQuery({someValue: 10}).animate({someValue: parseInt(pod_obj[obj_p][4])}, {
    // duration: 1500,
    // easing:'swing', // can be anything
    // step: function() { // called on every step
    //     // Update the element's text with rounded-up value:
    //     document.getElementsByClassName("podium-num-third")[0].innerHTML = String(this.someValue)
    //     // $('.upvote-downvote')[obj_i].text("<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + this.someValue);
    // }
    // });

      } else {
        console.log('else bud')
      }
    } catch {

    }
  }
  sum = sum_of_scores
  console.log(sum_of_scores)
  for(var count=0; count<10;count++) {
    console.log(count)
    if(String(document.getElementsByClassName("user-name-ll")[count].innerHTML) == myusername) {
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
  document.getElementById("vid-bac").style.display = "none";
  document.getElementById("new-back-btn-end").style.display = 'block';
  goez();
  distance_average = myguessdistances.reduce((a, b) => a + b, 0)
  distance_average = distance_average/distance_average.length
  socket.emit("disconnect-socket")
  document.getElementsByTagName("nav")[0].style.zIndex = "1000000000000";
}
function playagainfunc() {
  if(is_host == 1) {
    location.href = "private-room.html"
  } else {
    location.href = "private-room.html?rejoin"
  }
}
function playagain() {
    console.log('HEY WORLD!')
    roommenu();
    document.getElementById("rejoin-room").innerHTML = "Rejoin Room"
    document.getElementById("rejoin-room-code").innerHTML = "Join using the <b>previous</b> game code."
    document.getElementById("create-rooms-leave").style.display='none';
    document.getElementById("sixth-card").style.display = "none";
    document.getElementById("new-back-btn-end").style.display = "none";
  socket.emit('check_host', {
  host_or_not_socket_id: socket.id
  })
}
// setTimeout(function(){ socket.emit('server-ping'); console.log('sent on client') }, 5000);
function foo() {

    // your function code here
    socket.emit('server-ping'); console.log('sent on client')
    setTimeout(foo, 9000);
}
// socket.on('i-am-host', function(data){
//   console.log(' I AM HOST IS TRUE ')
//   document.getElementById("guess-button-id-host").style.display = 'block';
// });
foo();

socket.on('check_host_verify', function(data){
  document.getElementById("second-card").style.display = "none";
  emitted_reload = 0;
  console.log(data)
    console.log('IM DA HOST!!')
    document.getElementById("sixth-card").style.display = "none";
    initiateconnect(Math.floor(Math.random()*90000) + 10000);
  console.log('Host Notification Reached Client')
})

socket.on('room-dont-exist', function(data){
  alert("The room you tried to join does not exist. Let's try again!")
  exist_error_check = 1;
  location.href = "multiplayer.html?exist"
  // location.reload();
  // BRING BACKK IF BADD
    // document.getElementById("first-card").style.display = "none";
    // document.getElementById("second-card").style.display = "block";  
    // document.getElementById("third-card").style.display = "none";    
    // document.getElementById("fourth-card").style.display = "none";    
    // document.getElementById("fifth-card").style.display = "none";
    // document.getElementById("sixth-card").style.display = "none";
  // location.reload();
})
socket.on('room-full', function(data){
  // console.log('room full')
  alert("The room you tried to join is full. :( ")
  // exist_error_check = 1;
  // location.reload();
    document.getElementById("first-card").style.display = "none";
    document.getElementById("second-card").style.display = "block";  
    document.getElementById("third-card").style.display = "none";    
    document.getElementById("fourth-card").style.display = "none";    
    document.getElementById("fifth-card").style.display = "none";
    document.getElementById("sixth-card").style.display = "none";
  // location.reload();
})
var mydict = [];
socket.on('update-guess', function(data){
  if(data['intentional_exit'] != true) {
  // mydict = {}
  // console.log(allowUpdate)
  if(data["allowUpdate"] == 0) {
    player_guessed_aud = new Audio('static/playerGuessed.mp3')
  }
  player_guessed_aud.play();
  if(data["socket_id"] != socket.id) {
    console.log('Im not the guesser :)')
    for(let num=0; num<10; num++) {
      console.log('num: ' + String(num))
      console.log(document.getElementsByClassName("user-name-ll")[num].innerHTML)
      console.log(data["nickname"])
      if(document.getElementsByClassName("li-class")[num].style.display == 'block') {
        console.log('is block!!')
        if(String(document.getElementsByClassName("user-name-ll")[num].innerHTML) == String(data["nickname"])) {
          console.log('THEY ARE THE SAME U NOOB')
          mydict.push(num)
          document.getElementsByClassName("tooltip-text")[num].innerHTML = "I'm <b>"+ String(parseInt(data["distance"])) + "mi's</b> out. <span style='margin-left: 5px;'>👈</span>";
          if(isMobile) {
           document.getElementsByClassName("tooltip-text")[num].innerHTML = "✅";           
          }
          document.getElementsByClassName("tooltip-text")[num].style.display = "block";
        }
      } else {
      }
    }
  }
  for(let i=3; i>=0; i--) {
    // document.getElementsByClassName("li-class2")[i].style.borderBottom = "thin solid rgba(255, 255, 255, 0.6)"
    if(document.getElementsByClassName("li-class2")[i].style.display == "none") {
      console.log('is none')
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "<b>" + String(data["nickname"]) + "</b> <span style='color: #5bc0de;'>guessed</span>"
      // document.getElementsByClassName("li-class2")[i].style.borderBottom = "none"
      document.getElementsByClassName("li-class2")[i].style.display = "block"
      document.getElementById("new-back-btn10").style.display = 'block'
      return; 
    }
  }
  console.log('switching process intiateed')
  console.log(document.getElementsByClassName("user-name-ll2")[3].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[2].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[1].innerHTML)
  console.log(document.getElementsByClassName("user-name-ll2")[0].innerHTML)
  document.getElementsByClassName("user-name-ll2")[3].innerHTML = document.getElementsByClassName("user-name-ll2")[2].innerHTML
  document.getElementsByClassName("user-name-ll2")[2].innerHTML = document.getElementsByClassName("user-name-ll2")[1].innerHTML
  document.getElementsByClassName("user-name-ll2")[1].innerHTML = document.getElementsByClassName("user-name-ll2")[0].innerHTML
  document.getElementsByClassName("user-name-ll2")[0].innerHTML = "<b>" + String(data["nickname"]) + "</b> <span style='color: #5bc0de;'>guessed</span>"
}
})
function skipfunc() {
  if (localStorage.getItem("roundyes") === null) {
    $('#exampleModal').modal('toggle');
    document.getElementById("id01").style.display = "none";
  } else {
    socket.emit("end-round", {
      potential_host_id: socket.id
    })
  }
}
function skipfunc2() {
  $('#exampleModal').modal('toggle');
  if(document.getElementById("vehicle1").checked == true) {
    localStorage.setItem("roundyes", "yes")
  }
    socket.emit("end-round", {
      potential_host_id: socket.id
    })
  // skipfunc()
}
socket.on('room-duplicate', function(data){
  // console.log('room full')
  alert("Some is already using the username you inputted. Try again with something different, or join a random server with your desired username.")
  // exist_error_check = 1;
    // document.getElementById("first-card").style.display = "none";
    document.getElementById("second-card").style.display = "block";  
    document.getElementById("third-card").style.display = "none";    
    document.getElementById("fourth-card").style.display = "none";    
    document.getElementById("fifth-card").style.display = "none";
    document.getElementById("sixth-card").style.display = "none";
  // location.reload();
  // location.reload();
})
socket.on('one-person', function(data){
  alert("There is no one in your server except you. Invite a friend into the game to continue.")
})

var emitted_reload = 0;
// var thing = things[Math.floor(Math.random()*things.length)];
// //a console.log(timelimit)
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
var socket = io.connect("https://testapp150.herokuapp.com/");
var hostornot = false;
// var socket = io.connect('http://testapp149.herokuapp.com/');
window.addEventListener("focus", () => socket.connect());

function initiateconnect(random_room_id) {
  //a console.log(socket.connected)
  //a console.log('test')
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
    document.getElementById("sharelink").innerHTML = "One second! <i class='fa fa-spinner fa-spin' style='margin-left: 5px;'></i>"
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

  // //a console.log(currentusername.length)
  // //a console.log('-')
  // //a console.log(currentusername)
  myusername = currentusername;
  if(currentusername == undefined) {
    currentusername = things[Math.floor(Math.random()*things.length)];
    //a console.log('hey hey hey')
  }
  //a console.log(timelimit)
  random_room_id = random_room_id
  if(emitted_reload == 0) {
    //a console.log(socket.id)
    emitted_reload = 1
    socket.emit('create_room', {
      time: String(timelimit)[0],
      // player_lim: String(document.getElementById("form-number-2").value),
      username: currentusername,
      user_id_1: socket.id,
      room_id: random_room_id
    });
    //a console.log(random_room_id)
  }
  document.getElementById("linkInput").value = "https://virtualvacation.us/private-room?" + random_room_id
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
    if(username.length > 10) {
      alert("Username too long!")
      return;
    }
    //a console.log(room_id)
    //a console.log(username)
    //a console.log(userid)
    currentusername = username;
    myusername = username;
    //a console.log('room joined')
    exist_error_check = 0;
    sixth()
    socket.emit('join_room', {
      room_id: String(room_id),
      username: String(username),
      userid: String(userid)
    });
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
  //a console.log('user-join initiate')
  //a console.log(data["room_list"])
  num_of_players = 0;
  for (var key in data["room_list"]){
    num_of_players++
    //a console.log(num_of_players)
  }
  document.getElementById("playersWaiting").innerHTML = num_of_players
  document.getElementById("usernameList").innerHTML = String(document.getElementById("usernameList").innerHTML) + ", " + String(data["username"])
  if(hostornot == true) {
    var room_join_sound = new Audio('static/playerGuessed.mp3');
    room_join_sound.play();
  }
  // //a console.log(document.getElementById("usernameList").innerHTML)
  // //a console.log('fat')
    // //a console.log('detectedchat')
    // feedback.innerHTML = '';
    // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('change-num-of-players', function(data) {
  //a console.log('CHANGING NUM OF PLAYERS')
  //a console.log(data['room_list'])
  // if(videoloadfuncran == 1) {
  player_string = ""
  num_of_players = 0;
  for (var key in data["room_list"]){
    //a console.log(key.nickname)
    num_of_players++
    //a console.log(num_of_players)
    if(String(socket.id) == String(key)) {
      player_string += "You"
    } else {
      player_string += ", " + String(data["room_list"][key])
    }
  }  
  //a console.log(player_string)
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
  //a console.log('runs')
  //a console.log(data)
  //a console.log(data["host_id"])
    current_players[data["host_id"]] = [data["host_name"]]
  //a console.log(data["room_list"])
  num_of_players = 0;
  for (var key in data["room_list"]){
    num_of_players++
    //a console.log(num_of_players)
    // document.getElementById("usernameList").innerHTML = document.getElementById("usernameList").innerHTML + " " + data["room_list"].name
    // check if the property/key is defined in the object itself, not in parent
    // if (dictionary.hasOwnProperty(key)) {           
        // //a console.log(key, dictionary[key]);
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
  //a console.log('Start Game Notified Initiate')
  //a console.log(data)
  //a console.log(data["player_info"])
  round_total = data["rounds"]
  serverleft = 90;
  if (data["t_p_g"] == "1 minute 30 seconds") {
    //a console.log(' i am cool')
    serverleft = 90;
  } else if(data["t_p_g"] == "1 minute") {
    serverleft = 60
  } else if(data["t_p_g"] == "2 minutes") {
    //a console.log('im here')
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
            //a console.log('before sound played')
            var start_sound = new Audio('static/gamestartnotif.mp3');
            start_sound.play();
            //a console.log('sound able to be played')
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

                  // //a console.log('makeaguessran')
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
                  // // //a console.log(waitmessage)
                  // if(is_host == 1 && inguessingstage == 0) {
                  //   setTimeout(function() {
                  //     //a console.log("SENDING THIS MESSAGE!")
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
  // //a console.log(data["room_contents"])
  // room_contents = data["room_contents"]
  // user_length = room_contents.length;
  // //a console.log(user_length)
  // player_info = data["player_info"]
  // leaderboardcount(user_length)
  // iteration = 0
  // game
  // if(gamenotified == 0) {
    room_contents = data["room_contents"]
    // user_length = room_contents.length;
    user_length = Object.keys(room_contents.sockets).length
    // //a console.log(user_length)
    player_info = data["player_info"]
    // //a console.log(room_contents)
    // //a console.log('LEADERBOARD COUNT: ' + String(user_length))
    // //a console.log(room_contents.sockets)
    // //a console.log(Object.keys(room_contents.sockets).length)
    leaderboardcount(user_length)
    iteration = 0
      var items = Object.keys(player_info).map(function(key) {
    // //a console.log(key)
    // //a console.log(transmit_json[key][2])
    return [key, player_info[key][0], player_info[key][1], player_info[key][2]];
  });
  items.sort(function(first, second) {
    return second[2] - first[2];
  });
  //a console.log('MATCHED ITEMS PLAYER INFO')
  pre_pinfoobj = items
  const pinfoobj = items.slice(0, 10);
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  //a console.log(pinfoobj)
  for(let ione = 0; ione < pinfoobj.length; ione++) {
      document.getElementsByClassName("user-name-ll")[ione].innerHTML = pinfoobj[ione][1];
      document.getElementsByClassName("user-name-score")[ione].innerHTML = pinfoobj[ione][2]; 
      document.getElementsByClassName("li-circles")[ione].style.backgroundColor = pinfoobj[ione][3];
      //a console.log("COLORS HELP")
      gamenotified = 1;   
  }
  if(pre_pinfoobj.length > 10) {
    document.getElementById("li-class-and-others").style.display = "block";
    document.getElementById("and-others").innerHTML = "And " + String(pre_pinfoobj.length - 10) + " others..";
  } else {
    document.getElementById("li-class-and-others").style.display = "none";
  }
    // for (var key in player_info) {
    //   key_name = key
    //   key_value = player_info[key];
    //   //a console.log(key_name, key_value)
    //   document.getElementsByClassName("user-name-ll")[iteration].innerHTML = key_value[0];
    //   document.getElementsByClassName("user-name-score")[iteration].innerHTML = key_value[1];
    //   // //a console.log()
    //   //a console.log("iteration of dict.. 18")
    //   iteration += 1
    //   gamenotified = 1;
    //   // your code here...
    // }
  // }
  //a console.log(player_info)
  for(let i=3; i>=0; i--) {
    //a console.log('runnin this')
    // document.getElementsByClassName("li-class2")[i].style.borderBottom = "thin solid rgba(255, 255, 255, 0.6)"
    if(document.getElementsByClassName("li-class2")[i].style.display == "none") {
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "Round Started <i class='fa fa-check' style='color: #5cb85c; margin-left: 2px;'></i>"
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
  //a console.log(document.getElementsByClassName("user-name-ll2")[3].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[2].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[1].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[0].innerHTML)
  //a console.log('switching process intiateed')
  document.getElementsByClassName("user-name-ll2")[3].innerHTML = document.getElementsByClassName("user-name-ll2")[2].innerHTML
  document.getElementsByClassName("user-name-ll2")[2].innerHTML = document.getElementsByClassName("user-name-ll2")[1].innerHTML
  document.getElementsByClassName("user-name-ll2")[1].innerHTML = document.getElementsByClassName("user-name-ll2")[0].innerHTML
  document.getElementsByClassName("user-name-ll2")[0].innerHTML = "Round Started <i class='fa fa-check' style='color: #5cb85c; margin-left: 2px;'></i>"
});
var firsttime = 0;
var playerguesses = {}
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
  transmit_json = data['transmit_json']
  guess_coord_list = []
  document.getElementById("future-cclose-button-id").style.display = "block";
    document.getElementById("skip-button-id").style.display = "none";
    document.getElementById("original-c").style.display = "none";
          if(round_present == round_total) {
                player.mute();
                loadpodium();
                player.pauseVideo();
            // return;
          } else {
            document.getElementById("round-div").innerHTML = String(round_present) + "/" + String(round_total)
            audio_play.src = 'static/roundEndSuccess.mp3'
            audio_play.play();
          }
  current_i = 0
  var items = Object.keys(transmit_json).map(function(key) {
    //a console.log(key)
    //a console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  pre_new_obj2 = items
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  const new_obj = items.slice(0, 10);
  //a console.log(new_obj)
  for (var p = 9; p--;) {
    document.getElementsByClassName("br-tag")[p].style.display = "none";
  }
  obj_length = new_obj.length;
  if(pre_new_obj2.length > 10) {
    obj_length = 10;
    document.getElementById("li-class-and-others").style.display = "block";
    document.getElementById("and-others").innerHTML =  "And " + String(pre_new_obj2.length - 10) + " others..";
  } else {
    document.getElementById("li-class-and-others").style.display = "none";
  }
  pointed_right = 0;
  for(let obj_i = 0; obj_i < obj_length; obj_i++) {
    document.getElementsByClassName("br-tag")[obj_i].style.display = "block";
    document.getElementsByClassName("coolbob29")[obj_i].style.display = "block";
    //a console.log(String(new_obj[obj_i][1]))
    if(String(new_obj[obj_i][1] == 'null')) {
    }
    if(String(new_obj[obj_i][1]) != "0" && String(new_obj[obj_i][1]) != 'null') { 
      document.getElementsByClassName("upvote-downvote")[obj_i].innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(new_obj[obj_i][1])
      if(String(new_obj[obj_i][2]) != currentusername) {
        document.getElementsByClassName("coolbob29")[obj_i].innerHTML = String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>("+String(new_obj[obj_i][3])+"mi)</span>"
      } else {
        pointed_right = 1;
        document.getElementsByClassName("coolbob29")[obj_i].innerHTML = "<i class='fa fa-hand-o-right' style='margin-right: 5px;'></i>" + String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>("+String(new_obj[obj_i][3])+"mi)</span>"
      }
    } else {
      document.getElementsByClassName("coolbob29")[obj_i].innerHTML = String(new_obj[obj_i][2]) + " <span style='font-size: 14px; color: lightgrey;'>(No Guess)</span>"
      document.getElementsByClassName("upvote-downvote")[obj_i].innerHTML = "<i class='fa fa-caret-down' aria-hidden='true' style='margin-right: 4px; color: red;'></i><span style='color: red;'>0</span>"
      document.getElementsByClassName("br-tag")[obj_i].style.display = "block";
      document.getElementsByClassName("coolbob29")[obj_i].style.display = "block";
      document.getElementsByClassName("upvote-downvote")[obj_i].style.display = "block";
      if(String(new_obj[obj_i][2]) == currentusername) {
        pointed_right = 1
      }
    }
    document.getElementsByClassName("upvote-downvote")[obj_i].style.display = "block";
    document.getElementsByClassName("user-name-ll")[obj_i].innerHTML = String(new_obj[obj_i][2])
    document.getElementsByClassName("user-name-score")[obj_i].innerHTML = String(new_obj[obj_i][4])
    //a console.log('My Socket Id: ' + socket.id)
  }
  if(is_host == 1) {
    for(var xy=0; xy<items.length;xy++) {
      if(socket.id == String(items[xy][5])) {
        document.getElementById("guess-button-id-host").style.display = 'block';
        document.getElementById("future-c").style.display = 'block';
        break;
      }
    }
  }
  if(pointed_right == 0) {
    //a console.log('testing')
    if(String(transmit_json[socket.id][0]) != "0" && String(transmit_json[socket.id][0]) != 'null') {
      document.getElementById("first-coolbob29").innerHTML = "<i class='fa fa-hand-o-right' style='margin-right: 5px;'></i>" + String(transmit_json[socket.id][2]) + " <span style='font-size: 14px; color: lightgrey;'>("+String(transmit_json[socket.id][3])+"mi)</span>"
      document.getElementById("first-upvote-downvote").innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(transmit_json[socket.id][0])
    } else {
    document.getElementById("first-coolbob29").innerHTML = String(transmit_json[socket.id][2]) + " <span style='font-size: 14px; color: lightgrey;'>(No Guess)</span>"
    document.getElementById("first-upvote-downvote").innerHTML = "<i class='fa fa-caret-down' aria-hidden='true' style='margin-right: 4px; color: red;'></i><span style='color: red;'>0</span>"
    }
    document.getElementById("over-10-span").style.display = "block";
  } 
  $("#seventh-card").slideDown(700);
  document.getElementById("id01").style.display = 'block';
  if(streamer == 1) {
    document.getElementById("mapid").style.filter = ""
    document.getElementById("map-prompter").innerHTML = guess_text
    if(distance_between < 11 && round_present != round_total) {
      confetti.start(2000);
      document.getElementById("confetti-canvas").style.zIndex = 10000000000
      var sounds = new Audio('static/cheering.wav');
      sounds.play();
    }
  }
  noguesscount = 0;
  realguesscount=0;
  var items = Object.keys(transmit_json).map(function(key) {
    //a console.log(key)
    //a console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  //a console.log('MATCHED ITEMS-2')
  pre_new_obj2 = items
  const new_obj2 = items.slice(0, 10);
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  //a console.log(new_obj2)
  onleaderboard = 0;
  for(let obj_i = 0; obj_i < new_obj2.length; obj_i++) {
    document.getElementsByClassName("user-name-ll")[obj_i].innerHTML = String(new_obj2[obj_i][2])
    document.getElementsByClassName("user-name-score")[obj_i].innerHTML = String(new_obj2[obj_i][4])
    if(currentusername == new_obj2[obj_i][2]) {
      onleaderboard = 1
    }
  }
  if(onleaderboard == 0) {
    document.getElementById("user-name-ll").innerHTML = String(transmit_json[socket.id][2])
    document.getElementById("user-name-score").innerHTML = String(transmit_json[socket.id][4])  
    document.getElementById("lb-circle").style.backgroundColor = String(transmit_json[socket.id][7])  
    for(var i=0;i<pre_new_obj2.length;i++) {
      if(socket.id == pre_new_obj2[i][0]) {
        place = i+1
        document.getElementById("lb-circle").innerHTML = place
        break;
      }
    }
    document.getElementById("new-back-btn-lb").style.display = "block"; 
  } else {
    document.getElementById("new-back-btn-lb").style.display = "none";     
  }
  //a console.log(new_obj2.length)
  obj2_length = new_obj2.length
  leaderboardcount(obj2_length)
  map.invalidateSize();
  temporary_lst = []
  var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-check',
    markerColor: 'green',
    prefix: 'fa'
  });
  var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-times',
    markerColor: 'red',
    prefix: 'fa'
  });
  for (var key in transmit_json) {
    // //a console.log('KEY IN:')
    // //a console.log(transmit_json[key])
    temp_color = transmit_json[key][7]
    realguesscount+=1
    key_id = key
    score_coord_info = transmit_json[key];
    //a console.log(key_id, score_coord_info)
    guess_coord_list.push(score_coord_info[1])
    //a console.log(score_coord_info[1])
    //a console.log([globallat, globallon])

    current_i += 1

    if(score_coord_info[1] != undefined && score_coord_info[1][0] != globallat) {
  var yellowMarker = L.ExtraMarkers.icon({
    icon: 'fa-user-times',
    markerColor: temp_color,
    prefix: 'fa'
  });
    if(guessmade == false) {         
      marker1 = L.marker([random_lat_lon[0], random_lat_lon[1]], {icon: greenMarker})
      markerArray.push(marker1);
    }
    if(score_coord_info[1] != "away") {
    current_marker_push = L.marker(score_coord_info[1], {icon: yellowMarker}).bindPopup("<b>" + String(score_coord_info[2]) + "'s guess.</b><br>" + String(score_coord_info[3]) + "mi" + " <span style='font-size: 10.5px;'>(" + String(parseInt(parseInt(score_coord_info[3])*1.609)) + "km)</span>", {
  sticky: true,
  autoClose: false
  })
    markerArray.push(current_marker_push);
    var group = L.featureGroup(markerArray).addTo(map);
      if(obj2_length < 3) {
        current_marker_push.openPopup();
      }
      var polyline_new = L.polyline([random_lat_lon, score_coord_info[1]], {color: 'black', dashArray: '5,10'}).addTo(map);
      markerArray.push(polyline_new)
        //a console.log(guess_coord_list)
          try {
                      map.removeLayer(marker)
                      //a console.log('THIS WORKEDD YAYYY!!')
          } catch {
            //a console.log('catched occured!!!@!@!')
          }
              feature__group = new L.featureGroup(markerArray);
              //a console.log(feature__group)
    map.flyToBounds(feature__group.getBounds().pad(1));
    //a console.log('i iterated...')
        temporary_lst.push([score_coord_info[2], score_coord_info[1], score_coord_info[3], temp_color])
    } else {
          noguesscount++
          //a console.log('else initiated!!')
          // marker1 = L.marker([random_lat_lon[0], random_lat_lon[1]], {icon: greenMarker})
          // markerArray.push(marker1);
          var group = L.featureGroup(markerArray).addTo(map);
          try {
                      map.removeLayer(marker)
                      //a console.log('THIS WORKEDD YAYYY!!')
          } catch {
            //a console.log('catched occured!!!@!@!')
          }
    }
    feature__group = new L.featureGroup(markerArray);
    //a console.log(feature__group)
    map.fitBounds(L.featureGroup(markerArray).getBounds().pad(1));
    //a console.log('i iterated... 321')
    if(realguesscount == noguesscount) {
      //a console.log('set the zoom')
      map.setZoom(5);
    }
    } 
  }
  playerguesses[String(random_lat_lon)] = temporary_lst


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
      //a console.log('is none')
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "Round Over <i class='fa fa-clock-o' style='color: #d9534f; margin-left: 2px;'></i> "
      // document.getElementsByClassName("li-class2")[i].style.borderBottom = "none"
      document.getElementsByClassName("li-class2")[i].style.display = "block"
      document.getElementById("new-back-btn10").style.display = 'block'
      return; 
    }
  }
  //a console.log('switching process intiateed')
  document.getElementsByClassName("user-name-ll2")[3].innerHTML = document.getElementsByClassName("user-name-ll2")[2].innerHTML
  document.getElementsByClassName("user-name-ll2")[2].innerHTML = document.getElementsByClassName("user-name-ll2")[1].innerHTML
  document.getElementsByClassName("user-name-ll2")[1].innerHTML = document.getElementsByClassName("user-name-ll2")[0].innerHTML
  document.getElementsByClassName("user-name-ll2")[0].innerHTML = "Round Over <i class='fa fa-clock-o' style='color: #d9534f; margin-left: 2px;'></i> "
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
  if(num_of_lines > 10) {
    num_of_lines = 10
  }
  for(let i=0;i<num_of_lines;i++) {
    //a console.log(i)
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
var is_asdfadfadf;
var is_host = 0;
function begingame() {
    //a console.log(socket.id)
    //a console.log('Round Present:')
    //a console.log(round_present+1)
    is_host = 1;
    is_asdfadfadf = 1;
    //a console.log('EMITTED BEIGN GAME')
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
  //a console.log('Podium Json:')
  //a console.log(podium_json)
  var items = Object.keys(transmit_json).map(function(key) {
    //a console.log(key)
    //a console.log(transmit_json[key][2])
    return [key, transmit_json[key][0], transmit_json[key][2], transmit_json[key][3], transmit_json[key][4], transmit_json[key][5]];
  });
  items.sort(function(first, second) {
    return second[4] - first[4];
  });
  //a console.log('PODIUM ITEMS')
  const pod_obj = items
  //a console.log(pod_obj)
  // const new_obj = items.slice(0, Object.keys(transmit_json).length);
  // //a console.log(new_obj)
  document.getElementsByTagName("nav")[0].style.position = "fixed";
  document.getElementsByTagName("nav")[0].style.width = "100vw";
  coolsound = new Audio("static/gameOver.mp3")
  coolsound.play();
  sum_of_scores = 0;
  for(let obj_p = 0; obj_p < pod_obj.length; obj_p++) {
    try {
      document.getElementById("scoreboard__items").innerHTML = document.getElementById("scoreboard__items").innerHTML + "  <li class='scoreboard__item' data-count='0'><div class='scoreboard__title'>" + String(pod_obj[obj_p][2]) + "</div><div class='scoreboard__status'><div class='js-oneup'></div></div><div class='scoreboard__numbers'><span class='js-number'>" + String(pod_obj[obj_p][4]) + "</span></div><div class='scoreboard__bar js-bar'><div class='scoreboard__bar-bar'></div></div></li>"
      sum_of_scores += parseInt(pod_obj[obj_p][4])
      if(obj_p == 0) {
        document.getElementsByClassName("podium-name-first")[0].innerHTML = "<i class='fa fa-medal' style='color: #ebc137;'></i> " + String(pod_obj[obj_p][2])
        // document.getElementsByClassName("podium-num-first")[0].innerHTML = document.getElementsByClassName("user-name-score")[0].innerHTML | pod_obj[obj_p][4]
        document.getElementsByClassName("podium-num-first")[0].innerHTML = pod_obj[obj_p][4]
        // animateValue("podium-num-first", 0, pod_obj[obj_p][4], 2000, 0);
        document.getElementsByClassName("first-place")[0].style.display = "block"
      } else if (obj_p == 1) {
        document.getElementsByClassName("podium-name-second")[0].innerHTML = String(pod_obj[obj_p][2])
        // document.getElementsByClassName("podium-num-second")[0].innerHTML = String(pod_obj[obj_p][4])
        document.getElementsByClassName("second-place")[0].style.display = "block"
        // animateValue("podium-num-second", 0, pod_obj[obj_p][4], 2000, 0);
        document.getElementsByClassName("podium-num-second")[0].innerHTML = pod_obj[obj_p][4]
      } else if (obj_p == 2) {
        document.getElementsByClassName("podium-name-third")[0].innerHTML = String(pod_obj[obj_p][2])
        document.getElementsByClassName("podium-num-third")[0].innerHTML = String(pod_obj[obj_p][4])
        document.getElementsByClassName("third-place")[0].style.display = "block"
        document.getElementsByClassName("podium-num-third")[0].innerHTML = pod_obj[obj_p][4]
      } else {
        //a console.log('else bud')
      }
    } catch {

    }
  }
  sum = sum_of_scores
  //a console.log(sum_of_scores)
  function find_suffix(i) {
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
  }
  for(var count=0; count<100;count++) {
    //a console.log(count)
    if(String(document.getElementsByClassName("scoreboard__title")[count].innerHTML) == myusername) {
      place = count+1
      document.getElementsByClassName("scoreboard__title")[count].innerHTML = "<i class='fa fa-hand-o-right' style='margin-right: 5px;'></i> " + String(document.getElementsByClassName("scoreboard__title")[count].innerHTML)
      place = find_suffix(place)
      //a console.log('THE PLACE: ' + String(place))
      document.getElementById('place-number').innerHTML = place
      break;
    }
  }
  document.getElementById("vid-bac").style.display = "none";
  document.getElementById("new-back-btn-end").style.display = 'block';
  goez();
  socket.emit("disconnect-socket")
  document.getElementsByTagName("nav")[0].style.zIndex = "1000000000000";
}
function playagainfunc() {
  if(is_host == 1) {
    location.href = "private-room"
  } else {
    location.href = "private-room?rejoin"
  }
}
function playagain() {
    //a console.log('HEY WORLD!')
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
// setTimeout(function(){ socket.emit('server-ping'); //a console.log('sent on client') }, 5000);
function foo() {

    // your function code here
    socket.emit('server-ping'); //a console.log('sent on client')
    setTimeout(foo, 9000);
}
// socket.on('i-am-host', function(data){
//   //a console.log(' I AM HOST IS TRUE ')
//   document.getElementById("guess-button-id-host").style.display = 'block';
// });
// foo();

socket.on('check_host_verify', function(data){
  document.getElementById("second-card").style.display = "none";
  emitted_reload = 0;
  //a console.log(data)
    //a console.log('IM DA HOST!!')
    document.getElementById("sixth-card").style.display = "none";
    initiateconnect(Math.floor(Math.random()*90000) + 10000);
  //a console.log('Host Notification Reached Client')
})

socket.on('room-dont-exist', function(data){
  alert("The room you tried to join does not exist. Let's try again!")
  exist_error_check = 1;
    // document.getElementById("first-card").style.display = "none";
    document.getElementById("second-card").style.display = "block";  
    document.getElementById("third-card").style.display = "none";    
    document.getElementById("fourth-card").style.display = "none";    
    document.getElementById("fifth-card").style.display = "none";
    document.getElementById("sixth-card").style.display = "none";
})
socket.on('profanity', function(data){
  alert("Our filters detected profanity in your username.")
    // document.getElementById("first-card").style.display = "none";
    document.getElementById("second-card").style.display = "none";  
    document.getElementById("third-card").style.display = "none";    
    document.getElementById("fourth-card").style.display = "none";    
    document.getElementById("fifth-card").style.display = "block";
    document.getElementById("sixth-card").style.display = "none";
})
socket.on('room-full', function(data){
  // //a console.log('room full')
  alert("The room you tried to join is full. :( ")
  // exist_error_check = 1;
  // location.reload();
    // document.getElementById("first-card").style.display = "none";
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
  // //a console.log(allowUpdate)
  if(data["socket_id"] != socket.id) {
    //a console.log('Im not the guesser :)')
    for(let num=0; num<10; num++) {
      //a console.log('num: ' + String(num))
      //a console.log(document.getElementsByClassName("user-name-ll")[num].innerHTML)
      //a console.log(data["nickname"])
      if(document.getElementsByClassName("li-class")[num].style.display == 'block' && String(document.getElementsByClassName("user-name-ll")[num].innerHTML) == String(data["nickname"])) {
        //a console.log('is block!!')
          //a console.log('THEY ARE THE SAME U NOOB')
          mydict.push(num)
          document.getElementsByClassName("tooltip-text")[num].innerHTML = "I'm <b>"+ String(parseInt(data["distance"])) + "mi's</b> out. <span style='margin-left: 5px;'>👈</span>";
          if(isMobile) {
           document.getElementsByClassName("tooltip-text")[num].innerHTML = "✅";           
          }
          document.getElementsByClassName("tooltip-text")[num].style.display = "block";
          player_guessed_aud = new Audio('static/playerGuessed.mp3')
          player_guessed_aud.play();
      }
    }
  }
  for(let i=3; i>=0; i--) {
    // document.getElementsByClassName("li-class2")[i].style.borderBottom = "thin solid rgba(255, 255, 255, 0.6)"
    if(document.getElementsByClassName("li-class2")[i].style.display == "none") {
      //a console.log('is none')
      document.getElementsByClassName("user-name-ll2")[i].innerHTML = "<b>" + String(data["nickname"]) + "</b> <span style='color: #5bc0de;'>guessed</span>"
      // document.getElementsByClassName("li-class2")[i].style.borderBottom = "none"
      document.getElementsByClassName("li-class2")[i].style.display = "block"
      document.getElementById("new-back-btn10").style.display = 'block'
      return; 
    }
  }
  //a console.log('switching process intiateed')
  //a console.log(document.getElementsByClassName("user-name-ll2")[3].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[2].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[1].innerHTML)
  //a console.log(document.getElementsByClassName("user-name-ll2")[0].innerHTML)
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
  // //a console.log('room full')
  alert("Someone is already using the username you inputted. Try again with something different, or join a random server with your desired username.")
  // exist_error_check = 1;
    // document.getElementById("first-card").style.display = "none";
    document.getElementById("second-card").style.display = "none";  
    document.getElementById("third-card").style.display = "none";    
    document.getElementById("fourth-card").style.display = "none";    
    document.getElementById("fifth-card").style.display = "block";
    document.getElementById("sixth-card").style.display = "none";
  // location.reload();
  // location.reload();
})
socket.on('one-person', function(data){
  alert("There is no one in your server except you. Invite a friend into the game to continue.")
})

var opened_markers_and_lines = []
var mymap;
function loadsecondmap() {
  mymap = L.map('secondary-map-container').setView([51.505, -0.09], 1);
  var maplayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  });
  // var maplayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  // });
  maplayer.addTo(mymap);
  document.getElementById("secondary-map-container").style.display = "block";
  $('.leaflet-control-attribution').hide()
  document.getElementById("view-guesses-button").style.display = "none";
  document.getElementById("performance-span2").innerHTML = "Click the green markers to see every guess you made."

    var greenmarkerIcon = L.ExtraMarkers.icon({
      icon: 'fa-check',
      markerColor: 'green',
      prefix: 'fa'
    });
  //a console.log(playerguesses)
  for([key,value] of Object.entries(myguesses)) {
    // if(myguesses[String(key)] != undefined) {
      //a console.log(key)
      //a console.log(value)
      //a console.log('=')
      //a console.log(JSON.parse("[" + String(key) + "]"))
      endGreenMarker = L.marker(JSON.parse("[" + String(key) + "]"), {icon: greenmarkerIcon}).on('click', showMarkers).addTo(mymap);
    // }
  }
  mymap.invalidateSize();
  document.getElementById("performance-container").scrollIntoView({behavior: "smooth"});
}

function showMarkers(e) {
  try {
  mymap.removeLayer(opened_markers_and_lines)
  }catch(err){
    //a console.log(err)
  }
  opened_markers_and_lines = []
  templatlon = [e.latlng]
  //a console.log(templatlon)
  normal_lat_lon = [templatlon[0]["lat"],templatlon[0]["lng"]]
  templatlon = String(templatlon[0]["lat"]) + "," + String(templatlon[0]["lng"])
  guessmade = playerguesses[String(templatlon)]
  if(guessmade != undefined) {
  for(var i=0; i<guessmade.length;i++) {
      yellowMarker = L.ExtraMarkers.icon({
        icon: 'fa-question',
        markerColor: String(guessmade[i][3]),
        prefix: 'fa'
      });
      endPlayerMarker = L.marker(guessmade[i][1], {icon: yellowMarker}).bindPopup("<b>" + guessmade[i][0] + "'s guess.</b><br>" + guessmade[i][2] + "mi" + " <span style='font-size: 11px;'>(" + String(parseInt(parseInt(guessmade[i][2])*1.609)) + "km)</span>")
      opened_markers_and_lines.push(endPlayerMarker);   
      endPolyline = L.polyline([normal_lat_lon, guessmade[i][1]], {color: 'black', dashArray: '5,10'})
      opened_markers_and_lines.push(endPolyline);
  }
  }
  endGuess = myguesses[String(templatlon)]
    redmarkerIcon = L.ExtraMarkers.icon({
      icon: 'fa-times',
      markerColor: endGuess[2],
      prefix: 'fa'
    });
  // L.marker([globallat, globallon], {icon: redmarkerIcon})
  yourmarker = L.marker(endGuess[0], {icon: redmarkerIcon}).bindPopup("<b> Your guess!</b> <br> " + String(endGuess[1]) + "mi" + " <span style='font-size: 11px;'>(" + String((parseInt(endGuess[1])*1.609).toFixed(1)) + "km)</span>", {
    sticky: true // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
  })
  opened_markers_and_lines.push(yourmarker);
      endPolyline = L.polyline([normal_lat_lon, endGuess[0]], {color: 'black', dashArray: '5,10'})
      opened_markers_and_lines.push(endPolyline);
      opened_markers_and_lines = L.featureGroup(opened_markers_and_lines)
      mymap.flyToBounds(opened_markers_and_lines.getBounds(), {padding: L.point(60,60), duration:0.25});
      opened_markers_and_lines.addTo(mymap)
  yourmarker.openPopup();
      mymap.invalidateSize();


}

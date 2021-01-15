var sum = 1000; // rank 1.
var time = 250;

function goez() {
        confetti.start(800)
      document.getElementById("confetti-canvas").style.zIndex = "900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
// $('body').addClass('dark-mode');
  
// $('.js-style-switch').on('click', function(e) {
  // e.preventDefault();
  // $('body').toggleClass('dark-mode');
// });
  
$('.js-podium').each(function(){
  var t = $(this);
  setTimeout( function(){ 
  t.addClass('is-visible');
  var h = t.data('height');
  console.log(h);
  t.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
    }, time);
   time += 250;
});

   randomizeData();
   startBars();
   // sortItems();
   countUp();
  // randomizePodium();
   
  
  // setInterval(function(){ 
    
  //   randomizeData(); 
  //   startBars();
  //   sortItems();
  //   countUp();
  //   oneUp();
  //   $('.js-podium').removeClass('bump');
  //   podiumUpdate();
    
  // }, 10000);
  if(isMobile) {
    document.getElementById("gamepodiumtext").innerHTML = "Nice! 🥳"
    document.getElementsByClassName("scoreboard__podiums")[0].style.display = "none";
  }
}; 


function countUp() {
  
  $('.scoreboard__item').each(function() {
  var $this = $(this),
      countTo = $this.data('count');
  
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {
    duration: 500,
    easing:'linear',
    step: function() {
      $this.find('.js-number').text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.find('.js-number').text(this.countNum);
      //alert('finished');
    }

    });  
  }); 
}

function randomizeData() {
  count = 0;
  $('.scoreboard__item').each(function(){
   var rand = Math.floor(Math.random() * 900) + 1;
    $(this).data('count', parseInt(document.getElementsByClassName("js-number")[count].innerHTML) );
    $(this).find('.js-number').text(parseInt(document.getElementsByClassName("js-number")[count].innerHTML));
    count++
  });
    
}

function startBars() {
 $('.js-bar').each(function() {
   console.log('running');
  // calculate %.
  var t = $(this);
   setTimeout( function(){ 
  var width = t.parent('.scoreboard__item').data('count'); 
  width = width  / sum * 100;
     width = Math.round(width);
  t.find('.scoreboard__bar-bar').css('width',  width + "%");
     t.parent('li').addClass('is-visible');
      }, time);
   time += 0;
  });
}

function sortItems() {
 tinysort.defaults.order = 'desc';
  
 var ul = document.getElementById('scoreboard__items')
    ,lis = ul.querySelectorAll('li')
    ,liHeight = lis[0].offsetHeight
;
ul.style.height = ul.offsetHeight+'px';
for (var i= 0,l=lis.length;i<l;i++) {
    var li = lis[i];
    li.style.position = 'absolute';
    li.style.top = i*liHeight+'px';
}
tinysort('ol#scoreboard__items>li', 'span.js-number').forEach(function(elm,i){
    setTimeout((function(elm,i){
        elm.style.top = i*liHeight+'px';
    }).bind(null,elm,i),40);
});
  
  
}

function randEmail() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var string = '';
for(var ii=0; ii<15; ii++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
  return string + '@domain.tld';
}

function oneUp() {
  // play audio - update email.
  var randEmail = window.randEmail();
  $('.js-oneup').html('Ny påmeldt: ' + randEmail);
  $('.js-oneup-audio')[0].play();
}


function randomizePodium() {
  $('.js-podium-data').each(function() {
    var random = Math.floor(Math.random() * 900) + 1;
  $(this).fadeOut(200).text(random + ' deltagere').fadeIn(200);
  });
  $(this).data('count', random);
}

function podiumUpdate() {
  $('.js-podium').each(function() {
    $(this).addClass('bump');
    randomizePodium();
  });
}


function animateValue(id, start, end, duration, num) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementsByClassName(id)[num];
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
function animateValue2(id, start, end, duration, num) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementsByClassName(id)[num];
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = "<i class='fa fa-caret-up' aria-hidden='true' style='margin-right: 4px;'></i>" + String(current);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
// Function For Page Transitions
function fadeIn(beginTime, selector) {
  setTimeout(function(){ 

    $(selector).hide();
    $(selector).removeClass('hide');
    $(selector).fadeIn();
  }, beginTime);
}

function fadeInAndOut(beginTime, duration, selector) {
  setTimeout(function(){ 

    $(selector).hide();
    $(selector).removeClass('hide');
    $(selector).fadeIn();

    setTimeout(function(){ 
      $(selector).fadeOut();
     }, duration);
   }, beginTime);
}

// Load Current Colors In Color Picker
function getCurrentColor() {
  return $('#custom').spectrum('get').toHexString();
}

// Splash Transition to Page Two
$('#arrow a').on('click', function (e) {

    e.preventDefault();
  
    $('#pageOne').slideUp(1500);
    $('#pageTwo').slideDown(1500);
    $('#cupcake').removeClass('hide');

    fadeInAndOut(2000, 5000, '#instructArrow1');
    fadeInAndOut(7000, 5000, '#instructArrow2');
    fadeIn(12000, '#arrow2');

  });

  // Get Cupcake Colors & Change Them On Click

$('.frostingTop').click(function() {
  var color = getCurrentColor();
  $('.frostingTop').css('fill', color);
});

$('.frostingBottom').click(function() {
  var color = getCurrentColor();
  $('.frostingBottom').css('fill', color);
});

$('.cake').click(function() {
  var color = getCurrentColor();
  $('.cake').css('fill', color);
});

$('#wrapperMain path').click(function() {
  var color = getCurrentColor();
  $('#wrapperMain path').css('fill', color);
});

$('.wrapperLine').click(function() {
  var color = getCurrentColor();
  $('.wrapperLine').css('stroke', color);
});

// Hide the Page Two Container & Slide Up Page 3
$('#arrow2 a').on('click', function (e) {

  e.preventDefault();

  $('#pageTwo').css('background', '#FFFFFF').slideUp(1500);
  $(this).fadeOut();
  $('#custom').hide();
  $('#pageThree').removeClass('hide');
  $('#cupcake').appendTo('#pageThree');
  // $(clickAndColor).stop();

});

// Slider For Accesories
var accessories = ['img/accessory-1.png', 'img/accessory-2.png', 'img/accessory-3.png', 'img/accessory-4.png', 'img/accessory-5.png', 'img/accessory-6.png'];
var eyes = ['img/eyes-1.png', 'img/eyes-2.png', 'img/eyes-3.png', 'img/eyes-4.png', 'img/eyes-5.png', 'img/eyes-6.png'];
var mouths = ['img/mouth-1.png', 'img/mouth-2.png', 'img/mouth-3.png', 'img/mouth-4.png', 'img/mouth-5.png', 'img/mouth-6.png'];


var index = 0;

$('#accessory').on('click', function() {

  var nextItem = accessories[++index];

  $('#accessory').attr('src', nextItem);

  if (nextItem === accessories[5]) {
    index = -1;
  }

});

$('#eye').on('click', function() {

  var nextItem = eyes[++index];

  $('#eye').attr('src', nextItem);

  if (nextItem === eyes[5]) {
    index = -1;
  }

});

$('#mouth').on('click', function() {

  var nextItem = mouths[++index];

  $('#mouth').attr('src', nextItem);

  if (nextItem === mouths[5]) {
    index = -1;
  }

});

// var imageString = buildImageString(images[currentPosition]);




// var arrayLength = myStringArray.length;
// for (var i = 0; i < arrayLength; i++) {
//     alert(myStringArray[i]);
//     //Do something
// }

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

function getCurrentColor() {
  return $('#custom').spectrum('get').toHexString();
}

$('#arrow a').on('click', function (e) {

    e.preventDefault();
  
    $('#pageOne').slideUp(1500);
    $('#pageTwo').slideDown(1500);
    $('#cupcake').removeClass('hide');

    fadeInAndOut(2000, 5000, '#instructArrow1');
    fadeInAndOut(7000, 5000, '#instructArrow2');
    fadeIn(12000, '#arrow2');

  });

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

$('#arrow2 a').on('click', function (e) {

  e.preventDefault();

  // $('#pageTwo').slideUp(1500);
  $('#pageTwo').css('background', '#DDD5B0');
  $(this).fadeOut();
  $('#custome').hide();

});

    // setTimeout(function(){ 

    //   $('#instructArrow1').hide();
    //   $('#instructArrow1').removeClass('hide');
    //   $('#instructArrow1').fadeIn();
  
    //   setTimeout(function(){ 
  
    //     $('#instructArrow1').fadeOut();
        
    //    }, 10000);
  
    //  }, 3000);

    //  setTimeout(function(){ 

    //   $('#instructArrow2').hide();
    //   $('#instructArrow2').removeClass('hide');
    //   $('#instructArrow2').fadeIn();
  
    //   setTimeout(function(){ 
  
    //     $('#instructArrow2').fadeOut();
        
    //    }, 10000);
  
    //  }, 8000);



 


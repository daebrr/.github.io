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

    fadeInAndOut(2000, 5000, '#instructArrow1');
    fadeInAndOut(7000, 5000, '#instructArrow2');
    fadeIn(12000, '#arrow2');

  });

  // Get Cupcake Colors & Change Them On Click
var colorPickerEnabled = true;
function initCupcakeColor(selector) {
  $(selector).click(function() {
    if (colorPickerEnabled) {
      var color = getCurrentColor();
      $(selector).css('fill', color);
    }
  });
}

initCupcakeColor('.frostingTop');
initCupcakeColor('.frostingBottom');
initCupcakeColor('.cake');
initCupcakeColor('#wrapperMain path');

$('.wrapperLine').click(function() {
  var color = getCurrentColor();
  $('.wrapperLine').css('stroke', color);
});

// Hide the Page Two Container & Slide Up Page 3
$('#arrow2 a').on('click', function (e) {

  e.preventDefault();

  colorPickerEnabled = false;
  $(this).fadeOut();
  $('#pageTwo').css('background', '#FFFFFF').css('z-index', '0').slideUp(1500);
  $('#custom').hide();
  fadeIn(1000, '.fade');
  $('#pageThree').removeClass('hide');
  $('.pageThree .cupcake').removeClass('hide');
  $('.pageTwo #cupcake').remove();
  fadeInAndOut(2000, 5000, '#instructArrow3');
  fadeIn(7000, '#arrow3');

});

// Slider For Accesories
var accessories = ['img/accessory-1.png', 'img/accessory-2.png', 'img/accessory-3.png', 'img/accessory-4.png', 'img/accessory-5.png', 'img/accessory-6.png'];
var eyes = ['img/eyes-1.png', 'img/eyes-2.png', 'img/eyes-3.png', 'img/eyes-4.png', 'img/eyes-5.png', 'img/eyes-6.png'];
var mouths = ['img/mouth-1.png', 'img/mouth-2.png', 'img/mouth-3.png', 'img/mouth-4.png', 'img/mouth-5.png', 'img/mouth-6.png'];


var customizeCupcakeEnabled = true;
function customizeCupcake(id, array) {

  var index = 0;

  $(id).click(function() {

    if (customizeCupcakeEnabled) {
      ++index;
      if (index === array.length) {
        index = 0;
      }

      var nextItem = array[index];
      $(id).attr('src', nextItem);
  }
  });

}

customizeCupcake('#accessory', accessories);
customizeCupcake('#eye', eyes);
customizeCupcake('#mouth', mouths);


// Confetti

$('#arrow3').on('click', function() {

'use strict';

// If set to true, the user must press
// UP UP DOWN ODWN LEFT RIGHT LEFT RIGHT A B
// to trigger the confetti with a random color theme.
// Otherwise the confetti constantly falls.
var onlyOnKonami = false;

$(function() {
  // Globals
  var $window = $(window)
    , random = Math.random
    , cos = Math.cos
    , sin = Math.sin
    , PI = Math.PI
    , PI2 = PI * 2
    , timer = undefined
    , frame = undefined
    , confetti = [];

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    , pointer = 0;

  var particles = 150
    , spread = 40
    , sizeMin = 3
    , sizeMax = 12 - sizeMin
    , eccentricity = 10
    , deviation = 100
    , dxThetaMin = -.1
    , dxThetaMax = -dxThetaMin - dxThetaMin
    , dyMin = .13
    , dyMax = .18
    , dThetaMin = .4
    , dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function() {
      return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
    }, function() {
      var black = 200 * random()|0; return color(200, black, black);
    }, function() {
      var black = 200 * random()|0; return color(black, 200, black);
    }, function() {
      var black = 200 * random()|0; return color(black, black, 200);
    }, function() {
      return color(200, 100, 200 * random()|0);
    }, function() {
      return color(200 * random()|0, 200, 200);
    }, function() {
      var black = 256 * random()|0; return color(black, black, black);
    }, function() {
      return colorThemes[random() < .5 ? 1 : 2]();
    }, function() {
      return colorThemes[random() < .5 ? 3 : 5]();
    }, function() {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];
  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return (1-cos(PI*t))/2 * (b-a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1/eccentricity, radius2 = radius+radius;
  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
    while (measure) {
      var dart = measure * random(), i, l, interval, a, b, c, d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i+1], interval = b-a;
        if (dart < measure+interval) {
          spline.push(dart += a-measure);
          break;
        }
        measure += interval;
      }
      c = dart-radius, d = dart+radius;

      // Update the domain
      for (i = domain.length-1; i > 0; i -= 2) {
        l = i-1, a = domain[l], b = domain[i];
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2); // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      // Re-measure the domain
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i+1]-domain[i];
    }

    return spline.sort();
  }

  // Create the overarching container
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top      = '0';
  container.style.left     = '0';
  container.style.width    = '100%';
  container.style.height   = '0';
  container.style.overflow = 'visible';
  container.style.zIndex   = '9999';

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width  = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top  = this.y + 'px';

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length-1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function(height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = this.frame % 7777 / 7777, i = 0, j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top  = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height+deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti
      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random()|0 : 0]
        , count = 0;
      (function addConfetto() {
        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length-1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function(event) {
    pointer = konami[pointer] === event.which
      ? pointer+1
      : +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });
  
  if (!onlyOnKonami) poof();
});

$('#arrow3').fadeOut(100);
$('.pageThree').addClass('celebration');
customizeCupcakeEnabled = false;
fadeIn(12000, '#arrow4');

});

$('#arrow4').on('click', function() {
  window.location.reload()
});


///////////////////////////////////////////////////////////////////////
// Media Queries
//////////////////////////////////////////////////////////////////////


// Right Arrows to Down Arrows

var x = window.matchMedia('(max-width: 1100px)')
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

function myFunction(x) {
  if (x.matches) { // If media query matches
      $('.instructArrow2 p').html('&#8595;')
      $('.instructArrow3 p').html('&#8595;')
  } else {
      $('.instructArrow2 p').html('&#8594;')
      $('.instructArrow3 p').html('&#8594;')
  }
};

// Disable Mouse & Key Scrolling on Desktop

$('body').bind("mousewheel", function() {
  return false;
});

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


// Disable Mobile Scroll

function preventBehavior(e) {
  e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});

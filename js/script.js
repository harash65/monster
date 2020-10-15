/*====================================
  Setting
====================================*/
var loadingEn = false;
$(document).ready(function(){
/*====================================
  Initialization
====================================*/
/*=== Window width/height ===*/
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;
  var device = deviceDet(windowW);
  $(window).on('resize', function() {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    device = deviceDet(windowW);
  });
/*=== Device detection by width ===*/
  function deviceDet(windowW) {
    if (windowW < 415) {
      device = 'sp';
    } else if (windowW < 769) {
      device = 'tb';
    } else {
      device = 'pc';
    }
    return device;
  }
/*=== Scroll ===*/
  var windowTop = $(window).scrollTop();
  var windowBot = windowTop + windowH;
  $(window).on('scroll', function() {
    windowTop = $(window).scrollTop();
    windowBot = windowTop + windowH;
  });
/*====================================
  Monster
====================================*/
/*=== eye ===*/
  var r = 20;
  var $eyeL = $('.eye.left');
  var $eyeR = $('.eye.right');
  var eyeLX = $eyeL.offset().left - $(window).scrollLeft() + $eyeL.outerWidth()/2;
  var eyeLY = $eyeL.offset().top - $(window).scrollTop() + $eyeL.outerHeight()/2;
  var eyeRX = $eyeR.offset().left - $(window).scrollLeft() + $eyeR.outerWidth()/2;
  var eyeRY = $eyeR.offset().top - $(window).scrollTop() + $eyeR.outerHeight()/2;
  $(window).on('resize', function() {
    eyeLX = $eyeL.offset().left - $(window).scrollLeft() + $eyeL.outerWidth()/2;
    eyeLY = $eyeL.offset().top - $(window).scrollTop() + $eyeL.outerHeight()/2;
    eyeRX = $eyeR.offset().left - $(window).scrollLeft() + $eyeR.outerWidth()/2;
    eyeRY = $eyeR.offset().top - $(window).scrollTop() + $eyeR.outerHeight()/2;
  });
  $(window).on('mousemove scroll', function(e) {
    eyeLX = $eyeL.offset().left - $(window).scrollLeft() + $eyeL.outerWidth()/2;
    eyeLY = $eyeL.offset().top - $(window).scrollTop() + $eyeL.outerHeight()/2;
    eyeRX = $eyeR.offset().left - $(window).scrollLeft() + $eyeR.outerWidth()/2;
    eyeRY = $eyeR.offset().top - $(window).scrollTop() + $eyeR.outerHeight()/2;
    var dLX = e.clientX - eyeLX;
    var dLY = e.clientY - eyeLY;
    var dRX = e.clientX - eyeRX;
    var dRY = e.clientY - eyeRY;
    LLeft = r * dLX / Math.sqrt(dLX ** 2 + dLY ** 2);
    LTop = r * dLY / Math.sqrt(dLX ** 2 + dLY ** 2);
    RLeft = r * dRX / Math.sqrt(dRX ** 2 + dRY ** 2);
    RTop = r * dRY / Math.sqrt(dRX ** 2 + dRY ** 2);
    $('.eye.left .pupil').css({left: LLeft+'%', top: LTop+'%'});
    $('.eye.right .pupil').css({left: RLeft+'%', top: RTop+'%'});
  });
/*====================================
  Basic operation
====================================*/
/*=== Loading ===*/
  if (loadingEn) {
    var i = 0;
    sequence([
      {time:500, operation: function() { $('.loadingPanel .board').addClass('open'); }},
      {time:1500, operation: function() { $('.loadingPanel').addClass('trans1'); }},
      {time:1000, operation: function() { $('.loadingPanel').addClass('loaded'); }},
    ]);
  } else {
    $('.loadingPanel').css({display: 'none'});
  }
  function sequence(seq) {
    setTimeout(function() {
      seq[i]['operation']();
      i++;
      if (i < seq.length) {
        sequence(seq);
      } else {
        return 0;
      }
    }, seq[i]['time']);
  }
/*=== Smooth scroll ===*/
  $('a[href^="#"]').on('click', function() {
    var margin = (device == 'pc') ? 100:0;
    var href = $(this).attr('href');
    var target = $((href=='#' || href=='') ? 'html' : href);
    var posY = target.offset().top - margin;
    $('html, body').animate({scrollTop:posY}, 800, 'swing');
    return false;
  });
/*=== Hamberger ===*/
  var $target = $('header');
  $('.navBtn').on('click', function() {
    $target.toggleClass('open');
  });
  $('nav a').on('click', function() {
    $target.removeClass('open');
  });
  // footer避け
  $main = $('main');
  var mainBot = $main.offset().top + $main.outerHeight();
  var footerH = $('footer').outerHeight();
  navPos();
  $(window).on('scroll', function() {
    navPos();
  });
  function navPos() {
    if (device !== 'pc') {
      if (windowBot > mainBot) {
        $('.navBtn').css({'bottom': (footerH+10)+'px'});
        $('nav').css({'bottom': footerH+'px'});
      } else {
        $('.navBtn').css({'bottom': '30px'});
        $('nav').css({'bottom': 0});
      }
    }
  }
});


/*====================================
  Memo
======================================
console.log();
for (var i=0; i<array.length; i++) {}
$('').each(function(i, elm){});
var ua = navigator.userAgent;
if (((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) && windowW < 415 && !flagScrStopCancel ) {}
var i = $('li').index();
$('').on('click', function() {});
$('').on('mousedown', function(){});
$('').on('mousemove', function(){});
$('').on('mouseup mouseleave', function(){});
$('').on('touchstart', function(){});
$('').on('touchmove', function(){});
$('').on('touchend', function(){});
$(window).scrollTop()
$(window).on('scroll', function(){});
$(window).on('resize', function(e) {});
$('').offset().top
$('')[0].scrollHeight
.addClass('right')
.children('')
.find('*')
.append('<span></span>')
.outerWidth();
.attr('', )
.prop('disabled', true)
.animate({'': ''}, 100, 'linear', function(){});
var timer = setTimeout(function() {}, 100);
clearTimeout(timer);
*/
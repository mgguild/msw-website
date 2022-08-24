(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 90
  });

  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
  })
  
  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };

   // Collapse now if page is not at top
   navbarCollapse();
   // Collapse the navbar when page is scrolled
   $(window).scroll(navbarCollapse);
 
  
  
    function moveToSelected(element) {

      if (element == "next") {
        var selected = $(".selected").next();
      } else if (element == "prev") {
        var selected = $(".selected").prev();
      } else {
        var selected = element;
      }
    
      var next = $(selected).next();
      var prev = $(selected).prev();
      var prevSecond = $(prev).prev();
      var nextSecond = $(next).next();
    
      $(selected).removeClass().addClass("selected");
    
      $(prev).removeClass().addClass("prev");
      $(next).removeClass().addClass("next");
    
      $(nextSecond).removeClass().addClass("nextRightSecond");
      $(prevSecond).removeClass().addClass("prevLeftSecond");
    
      $(nextSecond).nextAll().removeClass().addClass('hideRight');
      $(prevSecond).prevAll().removeClass().addClass('hideLeft');
    
    }
    

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
            moveToSelected('prev');
            break;
    
            case 39: // right
            moveToSelected('next');
            break;
    
            default: return;
        }
        e.preventDefault();
    });
    
    $('#carousel div').click(function() {
      moveToSelected($(this));
    });
    
    $('#prev').click(function() {
      moveToSelected('prev');
    });
    
    $('#next').click(function() {
      moveToSelected('next');
    });
    
    $(document).ready(function() {
      // get video source from data-src button
      var $videoSrc;  
      $('.video-btn').click(function() {
          $videoSrc = $(this).data( "src" );
      });
      console.log($videoSrc);
      // autoplay video on modal load  
      $('#myModal').on('shown.bs.modal', function (e) {
      // youtube iframe configuration and settings
      $("#video").attr('src',$videoSrc + "?autoplay=1&rel=0&controls=1&loop=1&modestbranding=1" ); 
      })
      // stop playing the youtube video when modal closed
      $('#myModal').on('hide.bs.modal', function (e) {
          // stop video
          $("#video").attr('src', ''); 
      }) 
      });

      document.querySelector(".card-flip").classList.toggle("flip");

      document.querySelector(".mobile-card-flip").classList.toggle("mobile-flip");

      

  })(jQuery); // End of use strict
  
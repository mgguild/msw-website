(function($) {
  "use strict"; // Start of use strict

  //Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });


  // Get the container element
  var btnContainer = document.getElementById("mainNav");

  // Get all buttons with class="btn" inside the container
  var btns = btnContainer.getElementsByClassName("nav-link");

  // Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

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

  
  // // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
     target: '#mainNav',
     offset: 80
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
 
    
    // FOR YT BUTTON
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

      //for NFT cards
      document.querySelector(".card-flip").classList.toggle("flip");

      document.querySelector(".mobile-card-flip").classList.toggle("mobile-flip");

      //for FAQs
      $(".open").click( function () {
        var container = $(this).parents(".topic");
        var answer = container.find(".answer");
        var trigger = container.find(".faq-t");
        
        answer.slideToggle(200);
        
        if (trigger.hasClass("faq-o")) {
          trigger.removeClass("faq-o");
        }
        else {
          trigger.addClass("faq-o");
        }
        
        if (container.hasClass("expanded")) {
          container.removeClass("expanded");
        }
        else {
          container.addClass("expanded");
        }
      });
      

  })(jQuery); // End of use strict
  
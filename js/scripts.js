(async function($) {
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

      $('img[data-enlargable]').addClass('img-enlargable').click(function(){
        var src = $(this).attr('src');
        $('<div>').css({
            background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
            backgroundSize: 'contain',
            width:'100%', height:'100%',
            position:'fixed',
            zIndex:'10000',
            top:'0', left:'0',
            cursor: 'zoom-out'
        }).click(function(){
            $(this).remove();
        }).appendTo('body');
    });


    //  fetch('LEADERBOARD_API_KEY')
    // .then(res => {
    //   return res.json();
    // })
    //   .then(data =>{
    //     console.log(data);
    //   })
    //   .catch(error => console.log(error));

    //   function showText() {
    //     document.getElementById("hiddenText").style.display = "block";
    //   }

      var PlayFab = require("PlayFabSdk");

      PlayFab.settings.titleId = "leaderboard";
      PlayFab.settings.developerSecretKey = "681TJSRQRR6ZNA5QRD5XK6G71MBJXKM6QXPEY1EZHCWO7Y5MP8";

      var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: "CUSTOM_ID",
        CreateAccount: true
    };
    
      PlayFabClientSDK.LoginWithCustomID(loginRequest, function(result, error) {
          if (error) {
              console.error("Error logging in:", error);
          } else {
              console.log("Logged in successfully:", result);
          }
      });

   

})(jQuery); // End of use strict
  
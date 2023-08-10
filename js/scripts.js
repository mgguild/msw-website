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
    
 // JavaScript to handle the carousel functionality
const triggerImages = document.querySelectorAll(".trigger-image");
const carousels = document.querySelectorAll(".carousel");

triggerImages.forEach(image => {
  image.addEventListener("click", () => {
    const targetCarousel = document.getElementById(image.parentElement.getAttribute("data-carousel"));
    targetCarousel.style.display = "flex";
  });
});

carousels.forEach(carousel => {
  const images = Array.from(carousel.querySelectorAll(".carousel-image"));
  let currentImageIndex = 0;

  const prevButton = carousel.querySelector(".prev-button");
  const nextButton = carousel.querySelector(".next-button");
  const closeButton = carousel.querySelector(".close-button"); // Get close button

  function showImage(index) {
    images.forEach((image, idx) => {
      image.style.display = idx === index ? "block" : "none";
    });

    // Highlight the active mini image
    const miniImages = carousel.querySelectorAll(".mini-image");
    miniImages.forEach((miniImage, idx) => {
      miniImage.classList.toggle("active-mini", idx === index);
    });
  }

  // Function to change image when clicking on mini image
  const miniImages = carousel.querySelectorAll(".mini-image");
  miniImages.forEach((miniImage, index) => {
    miniImage.addEventListener("click", () => {
      showImage(index);
    });
  });

  prevButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  });

  nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  });

  closeButton.addEventListener("click", () => {
    carousel.style.display = "none"; // Close the carousel
  });

  // Handle closing the carousel when clicking outside of images
  carousel.addEventListener("click", (event) => {
    if (event.target === carousel) {
      carousel.style.display = "none";
    }
  });

  // Show the first image initially
  showImage(currentImageIndex);
});



})(jQuery); // End of use strict
  
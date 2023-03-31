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

    /* 
  GETTING DATA USING GOOGLE SHEETS API V4
    
  *API Key
  AIzaSyDYmEIzm5sd4eLssm6GOzB5LTmh7A8XGdw
  Created here
  https://console.cloud.google.com/apis/credentials
 
  *Have to activate the API Project
  https://console.cloud.google.com/apis/api/sheets.googleapis.com/overview?project=leaderboard-app&folder=&organizationId=
  
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+worksheet_id+'/values/'+tab_name+'?alt=json&key='+key-value;
  
*/
$(document).ready(function () {
  getSpreadsheetData();
  setInterval(function () {
    getSpreadsheetData();
  }, 20000);

  function getSpreadsheetData() {
    // Spreadsheet URL: https://docs.google.com/spreadsheets/d/18BqLsBCJ38B3rNQG93gIyShhaSXyuI1Vobbel-tZzj0
    /* sheetID: Pull this from Google Sheet */
    var sheetID = "18BqLsBCJ38B3rNQG93gIyShhaSXyuI1Vobbel-tZzj0";
    var tab_name = "DO NOT CHANGE THIS SHEET NAME";
    var apiKey = "AIzaSyDYmEIzm5sd4eLssm6GOzB5LTmh7A8XGdw";
    var sheetUrl =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      sheetID +
      "/values/" +
      tab_name +
      "?alt=json&key=" +
      apiKey;
    var entry;
    console.log(sheetUrl);
    $.getJSON(sheetUrl, function (data) {
      console.log(data);
      entry = data.values;
      var names = "";
      names += `<ul class="leaderboard-table">`;
      names += ``;
      $(entry).each(function (index) {
        if (index > 0) {
          names += `<li class="person" data-flag="${this[5]}" data-position="${this[3]}">
          <div class="rank"></div>
          <div class="name">${this[0]} ${this[1]}</div>
          <div class="score">${this[3]}</div>
          </li>`;
        }
      });
      names += `</ul>`;
      console.log("Loading the data");
      setTimeout(function () {
        /* Removed flagged items */
        $(".person[data-flag='1']").remove();

        /* Reorders list based on score */
        $(".leaderboard-table").each(function () {
          $(this).html(
            $(this)
              .children("li")
              .sort(function (a, b) {
                return $(b).data("position") > $(a).data("position") ? 1 : -1;
              })
          );
        });
        document
          .querySelectorAll("#leaderboard .rank")
          .forEach((el, i) => (el.innerHTML = i + 1));

        /* Breaks list into two sections */
        var UL = $("#leaderboard ul"),
          topThree = UL.find("li:gt(2)"),
          topFifty = $("<div>").attr("id", "top-3");
        UL.before(topFifty);
        if (topThree.length) {
          topFifty.after(
            $("<div>").attr("id", "top-50").append($("<ul>").append(topThree))
          );
        }
        topFifty.append(UL);

        /* Breaks bottom list into multiple columns */
        $(function ($) {
          var num_cols = 4,
            container = $("#top-50"),
            listItem = "li",
            listClass = "sub-list";
          container.each(function () {
            var items_per_col = new Array(),
              items = $(this).find(listItem),
              min_items_per_col = Math.floor(items.length / num_cols),
              difference = items.length - min_items_per_col * num_cols;
            for (var i = 0; i < num_cols; i++) {
              if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
              } else {
                items_per_col[i] = min_items_per_col;
              }
            }
            for (var i = 0; i < num_cols; i++) {
              $(this).append($("<ul ></ul>").addClass(listClass));
              for (var j = 0; j < items_per_col[i]; j++) {
                var pointer = 0;
                for (var k = 0; k < i; k++) {
                  pointer += items_per_col[k];
                }
                $(this)
                  .find("." + listClass)
                  .last()
                  .append(items[j + pointer]);
              }
            }
          });
        });

        /* Only show Top X results  */
        $("#leaderboard li:gt(30)").remove();

        /* Adds medals to Top 3 */
        $("#top-3 li:nth-of-type(1) .rank").html("🥇");
        $("#top-3 li:nth-of-type(2) .rank").html("🥈");
        $("#top-3 li:nth-of-type(3) .rank").html("🥉");
        console.log("Sorting the data");
      }, 0);

      /* Displays it all */
      $("#leaderboard").html(names);
      console.log("Displaying the data");
    });
  }
});

    
    
      
  })(jQuery); // End of use strict
  
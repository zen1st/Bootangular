//(function($) {
$(document).ready(function(){
  "use strict"; // Start of use strict
  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;
  
	var headerHeight;
	
  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
	
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
		headerHeight=$('#mainNav').height();
		
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
			
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }
  else{
	$('#mainNav').css("position", "fixed");	
  }
  
	$(window).on('resize', function(){
	  if ($(window).width() > MQL) {
		$('#mainNav').css("position", "");
	  }
	  else{
		$('#mainNav').css("position", "fixed");
	  }
	});
});
//})(jQuery); // End of use strict

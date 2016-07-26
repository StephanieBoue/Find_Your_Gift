$(document).ready(function() {
 
  $("#homeCarousel").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      items : 1, 
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false,
      autoPlay : 3000,
      stopOnHover : true,
 
  });

  $("#CarouselProducts").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds 
      items : 6,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
 
  });
 
});

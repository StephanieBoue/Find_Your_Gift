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

Template.HomePage.onRendered(function() {
  $('#homeCarousel').owlCarousel({
 
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

Template.BrowsePage.onRendered(function() {

  $("#CarouselProducts").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds 
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
 
  });

});



// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"navbar"});
  this.render("HomePage", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'browse' page
Router.route('/browse', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"navbar"});
  this.render("BrowsePage", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'offer' page
Router.route('/offer', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"navbar"});
  this.render("OfferPage", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'drawing' page
Router.route('/drawing', function () {
  console.log("you hit /drawing ");
  this.render("navbar", {to:"navbar"});
  this.render("drawingPage", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'profile' page
Router.route('/profile', function () {
  console.log("you hit /profile ");
  this.render("navbar", {to:"navbar"});
  this.render("profilePage", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'help' page
Router.route('/help', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"navbar"});
  this.render("Help", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});


// Tempalte helpers

Template.profilePage.helpers({username:function(){
if (Meteor.user()){
  return Meteor.user().username;
    //return Meteor.user().emails[0].address;
}
else {
  return "anonymous internet user";
}
}
});

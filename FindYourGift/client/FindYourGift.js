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
  this.render("images", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

// 'offer' page
Router.route('/offer', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"navbar"});
  this.render("offer", {to:"main"}); 
  this.render("footer", {to:"footer"});   
});

Router.route('/image/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('image', {
    to:"main", 
    data:function(){
      return Images.findOne({_id:this.params._id});
    }
  });
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


// Template helpers

Template.profilePage.helpers({

  nickname:function(){
    if (Meteor.user()){
      return Meteor.user().profile.Nickname;
        //return Meteor.user().emails[0].address;
    }
    else {
      return "anonymous internet user";
    }
    },
  profileType:function(){
    if (Meteor.user()){
      return Meteor.user().profile.ProfileType;
        //return Meteor.user().emails[0].address;
    }
    else {
      return "anonymous internet user";
    }
  },
  avatar:function(){
    if (Meteor.user()){
      return Meteor.user().profile.avatar;
        //return Meteor.user().emails[0].address;
    }
    else {
      return "anonymous internet user";
    }
  },
});


Template.images.helpers({
    images:function(){
      if (Session.get("userFilter")){// they set a filter!
        return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating:-1}});         
      }
      else {
        return Images.find({}, {sort:{createdOn: -1, rating:-1}, limit:Session.get("imageLimit")});         
      }
    },
    filtering_images:function(){
      if (Session.get("userFilter")){// they set a filter!
        return true;
      } 
      else {
        return false;
      }
    },
    getFilterUser:function(){
      if (Session.get("userFilter")){// they set a filter!
        var user = Meteor.users.findOne(
          {_id:Session.get("userFilter")});
        return user.username;
      } 
      else {
        return false;
      }
    },
    getUser:function(user_id){
      var user = Meteor.users.findOne({_id:user_id});
      if (user){
        return user.profile.Nickname;
      }
      else {
        return "Anonymous";
      }
    }
    });


Template.offer.helpers({
      images:function(){
        
          return Images.find({createdBy:Meteor.user()._id}, {sort:{createdOn: -1, rating:-1}});         
 
      },
      filtering_images:function(){
        if (Session.get("userFilter")){// they set a filter!
          return true;
        } 
        else {
          return false;
        }
      },
      getFilterUser:function(){
        if (Session.get("userFilter")){// they set a filter!
          var user = Meteor.users.findOne(
            {_id:Session.get("userFilter")});
          return user.username;
        } 
        else {
          return false;
        }
      },
      getUser:function(user_id){
        var user = Meteor.users.findOne({_id:user_id});
        if (user){
          return user.username;
        }
        else {
          return "anon";
        }
}
    });


Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    },  
    'click .js-rate-image':function(event){
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this.data_id;
      console.log(image_id);

      Images.update({_id:image_id}, 
                    {$set: {rating:rating}});
    }, 
});

Template.offer.events({
    'click .js-del-image':function(event){
       var image_id = this._id;
       console.log(image_id);
       // use jquery to hide the image component
       // then remove it at the end of the animation
       $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
       })  
    }, 
    'click .js-show-image-form':function(event){
      console.log("should display image add form")
      $("#image_add_form").modal();
    }, 

'submit .js-add-image':function(event){
  var img_src, img_alt, price;

    img_src = event.target.img_src.value;
    img_alt = event.target.img_alt.value;
    price = event.target.price.value;

    console.log("src: "+img_src+" alt:"+img_alt+" price:"+price);
    if (Meteor.user()){
      Images.insert({
        img_src:img_src, 
        img_alt:img_alt, 
        price:price,
        createdOn:new Date(),
        createdBy:Meteor.user()._id
      });
  }
    $("#image_add_form").modal('hide');
 return false;
}
});





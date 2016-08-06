points = new Meteor.Collection('pointsCollection');

Meteor.methods({
  'clear': function () {
    points.remove({});
  },
});

Meteor.startup(function(){
if (Images.find().count() == 0){
	for (var i=1;i<8;i++){
		Images.insert(
			{
				img_src:"Products/Product"+i+".png",
				img_alt:"Creation"+i,
				User:"Stephanie"
			}
		);	
	}// end of for insert images
	// count the images!
	console.log("startup.js says: "+Images.find().count());
}// end of if have no images
});

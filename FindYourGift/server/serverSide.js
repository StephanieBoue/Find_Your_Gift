points = new Meteor.Collection('pointsCollection');

Meteor.methods({
  'clear': function () {
    points.remove({});
  },
});

Meteor.startup(function(){
if (Images.find().count() == 0){
	for (var i=1;i<14;i++){
		Images.insert(
			{
				img_src:"Products/Product"+i+".png",
				img_alt:"Creation"+i,
				createdBy:"5WvBfhpjbT9qtW7Jd"
			}
		);	
	}// end of for insert images
	// count the images!
	console.log("startup.js says: "+Images.find().count());
}// end of if have no images
});

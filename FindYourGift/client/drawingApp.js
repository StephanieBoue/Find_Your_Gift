points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";
var sizeCircle=10;
var shape = "circle";

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun(function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
    else {self.clear();}
  });
  Session.setDefault("templateName", "index");
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName")
  }
});

Template.body.events({
  "click .index": function() {
    Session.set("templateName", "index");
  },
  "click .drawing": function() {
     Session.set("templateName", "wall");

      Meteor.call('clear', function() {
          canvas.clear();
    });
  }
  // ..
});

Template.drawingPage.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },


  "click button.line": function () {
    console.log("change shape to line");
    shape = "line";
    console.log("the shape should now be "+shape);
  },

  "click button.circle": function () {
    console.log("change shape to circle");
    shape = "circle";
    console.log("the shape should now be "+shape);
  },

    "click button.rectangle": function () {
    console.log("change shape to rectangle");
    shape = "rectangle";
    console.log("the shape should now be "+shape);
  },

 "click button.save": function (event) {
  { submit_download_form("svg"); }
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "changeColor": function(event){
      lastX=0;
      lastY=0;
      strokeColor = event.color.toHex();
      //console.log("The new stroke color is"+strokeColor);
  },

  "click button.thicker": function () {
        lastX=0;
        lastY=0;
        thickness+=1;

  },

  "click button.thinner": function () {
      lastX=0;
      lastY=0;

    if (thickness < 0) {
      thickness=1;
    }
    else{
     thickness-=1;
    }
  },

    "click button.larger": function () {
      sizeCircle+=1;
    },

      "click button.smaller": function () {
        if (sizeCircle=1)
        {
            sizeCircle=1;
        }
      else {sizeCircle-=1;}
    },
})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      if (shape=="line"){

              points.insert({

                  x: (event.pageX - offset.left),
                  y: (event.pageY - offset.top),
                  x1: lastX,
                  y1: lastY,
                  w: thickness,
                  c: strokeColor,
                  shape : shape,

              }); // end of points.insert()
         }   
        if (shape=="rectangle"){

              points.insert({
                  x: (event.pageX - offset.left),
                  y: (event.pageY - offset.top),
                  x1: lastX,
                  y1: lastY,
                  width: Math.abs(lastX - (event.pageX - offset.left)),
                  height: Math.abs(lastY - (event.pageY - offset.top)),
                  c: strokeColor,
                  shape : shape,

              }); // end of points.insert()
         }       
        if(shape=="circle")
        {
           points.insert({
              x: (event.pageX - offset.left),
              y: (event.pageY - offset.top),
              x1: (event.pageX - offset.left),
              y1: (event.pageY - offset.top),
              sizeCircle : sizeCircle,
              c: strokeColor,
              shape : shape,
            }); 
        }
        
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint(event);
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
     lastX=0;
     lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint(event);
    }
  }
});

function submit_download_form(output_format)
{
      // Get the d3js SVG element
      var tmp = document.getElementById("canvas");
      //console.log(tmp);
      var svg = tmp.getElementsByTagName("svg")[0];
      //console.log(svg);
      // Extract the data as SVG text string
      var svg_xml = (new XMLSerializer).serializeToString(svg);
      //console.log(svg);

      var source = svg_xml;

      // //add name spaces.
       if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
           source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
       }
       if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
           source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
       }
      
      // //add xml declaration
       //source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

       //convert svg source to URI data scheme.
       var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
       console.log(url);
      // //set url value to a element's href attribute.
       document.getElementById("link").href = url;

}


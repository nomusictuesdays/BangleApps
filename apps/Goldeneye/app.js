require("Font6x8").add(Graphics);
var glowface = require("Storage").read("goldeneyejs1_night4.png");
const xc = 120, yc = 133;
var twoPi  = 2*Math.PI;
var Pi     = Math.PI;
var halfPi = Math.PI/2;
var drawTimeout;

function nightglow(){
var d = new Date();
var h = d.getHours() % 12 || 12, m = d.getMinutes(), yyyy = d.toISOString().substr(0,4), mm = d.toISOString().substr(5,2), dd = d.toISOString().substr(8,2), ed = d.toISOString().substr(9,1);
var time = (""+h).substr(-2) + ":" + ("0"+m).substr(-2);
  //var time = (""+h).substr(-2) + ":" + ("0"+m).substr(-2);
  var HoursAngle   = (d.getHours()+(d.getMinutes()/60))/12 * twoPi - Pi;
  var MinutesAngle = (d.getMinutes()/60) * twoPi - Pi;
  //var SecondsAngle = (d.getSeconds()/60) * twoPi - Pi;
  var SecondsAngle = (d.getSeconds()/60+d.getMilliseconds()/60000) * twoPi - Pi;

	g.reset();  // Reset the state of the graphics library
	g.clear();
	g.drawImage(glowface);
  g.drawImage(require("Storage").read("HourHandGlow.png"),xc,yc,{scale:1,rotate:HoursAngle});
  g.drawImage(require("Storage").read("MinHandGlow.png"),xc,yc,{scale:1,rotate:MinutesAngle});
  g.drawImage(require("Storage").read("SecHandGlow.png"),xc,yc,{scale:1,rotate:SecondsAngle});
  
  queueDraw();
}

function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(() => {
    drawTimeout = undefined;
    nightglow();
  }, 250 - (Date.now() % 250));
}

g.reset();
g.clear(); // Clear the screen once, at startup
queueDraw(); // draw immediately at first

Bangle.setUI("clock"); // Show launcher when middle button pressed

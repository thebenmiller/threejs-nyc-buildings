var fs = require('fs');
var json = JSON.parse(fs.readFileSync('nyc-geom_xl.json', 'utf8'));

console.log('loaded.');

var output = [];
var res;
var ob;

for(var i=0; i<json.length; i++){
  console.log('parsing line: '+i);
  ob = json[i];
  res = {'bbl' : ob.bbl, 'bin' : ob.bin, 'z' : ob.z, 'c' : getCentroid(ob.r) };
  output.push(res);
}

fs.writeFileSync('nyc-output.json', JSON.stringify(output));

function getCentroid(multiPolygon){
  return getPolygonCentroid(multiPolygon.coordinates[0][0]);
}

function getPolygonCentroid(pts) {
   var first = pts[0], last = pts[pts.length-1];
   if (first[0] != last[0] || first[1] != last[1]) pts.push(first);
   var twicearea=0,
   x=0, y=0,
   nPts = pts.length,
   p1, p2, f;
   for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
      p1 = pts[i]; p2 = pts[j];
      f = p1[0]*p2[1] - p2[0]*p1[1];
      twicearea += f;          
      x += ( p1[0] + p2[0] ) * f;
      y += ( p1[1] + p2[1] ) * f;
   }
   f = twicearea * 3;
   return [x/f, y/f];
}
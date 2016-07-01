var fs = require('fs');

var file = 'manhattan-geom.json';

var rect = [
            [
              -74.04772962697038,
              40.68291694544512
            ],
            [
              -74.04772962697038,
              40.87903804730722
            ],
            [
              -73.90665099539478,
              40.87903804730722
            ],
            [
              -73.90665099539478,
              40.68291694544512
            ]
          ];

var xMin = rect[2][0];
var xMax = rect[0][0];

var xMaxNorm = xMax - xMin;

var yMin = rect[0][1];
var yMax = rect[2][1];

var yMaxNorm = yMax - yMin;

var xDist = 39041.99;
var yDist = 71555.118;

var json = JSON.parse(fs.readFileSync(file, 'utf8'));


var output = [];
var loc,ob;

for(var i=0; i<json.length; i++){
  ob = { "name" : "undefined", "points" : []};
  loc = json[i];
  for(var n=0; n<loc.length; n++){
    var px = loc[n][0];
    var py = loc[n][1];
    var pxNorm = (px - xMin) / xMaxNorm;
    var pyNorm = (py - yMin) / yMaxNorm;
    ob.points.push([ pxNorm, pyNorm ]);
  }
  output.push(ob);
}

fs.writeFileSync('manhattan-land.json', JSON.stringify(output));





var fs = require('fs');

var file = process.argv.slice(2,3);

if(!file){
  throw("required input file");
}

var json = JSON.parse(fs.readFileSync('nyc-geom_xl.json', 'utf8'));
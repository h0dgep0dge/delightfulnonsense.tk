var fs = require('fs'),
    readline = require('readline');

var geojson = {
	"type": "FeatureCollection",
	"features": []
};

var rd = readline.createInterface({
	input: fs.createReadStream('raw'),
	output: process.stdout,
	terminal: false
});

rd.on('line', function(line) {
	line = line.split(';');
	line[2] = line[2].split(',');
	var feature = {
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [Number(line[2][1]),Number(line[2][0])] // Has to be reversed because geojson wants them backwards. I don't know....
		},
		"properties": {
			"time": line[0],
			"description": line[1]
		}
	};
	geojson.features.push(feature);
});

rd.on('close',function() {
	console.log(JSON.stringify(geojson));
});
const fs = require('fs');

const files = fs.readdirSync('controllers');

let modules = {};
for(let i = 0; i < files.length; i++){
	let file = files[i].split('.');
	if(file[1] == 'js'){
		modules[file[0]] = require('../controllers/' + files[i]);
	}
}

module.exports = modules;


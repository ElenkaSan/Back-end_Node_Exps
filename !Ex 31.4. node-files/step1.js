
const fs = require('fs');
const process = require('process');

function cat(path) {
	fs.readFile('one.txt', 'utf8', (error, data) => {
		if (error) {
			console.error(`Error reading ${path}: ${error}`);
			process.exit(1);
		}
		else {
			console.log(data);
		}
	});
}

cat(process.argv[2]);
const fs = require('fs');
const process = require('process');
const axios = require('axios');


function cat(path, out) {
	fs.readFile('one.txt', 'utf8', (error, data) => {
		if (error) {
			console.error(`Error reading ${path}: ${error}`);
			process.exit(1);
		}
		else {
			output(data, out);
		}
	});
}

async function webCat(url, out) {
	try {
		let response = await axios.get(url);
		output(response.data, out);
	} catch (error) {
		console.error(`Error fetching ${url}: ${error}`);
		process.exit(1);
	}
}

let path;
let out;

if (process.argv[2] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
}
else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, out);
}
else {
	cat(path, out);
}

function output(text, out) {
	if (out) {
		fs.writeFile(out, text, 'utf8', function(error) {
			if (error) {
				console.erroror(`File ${out} write failed: ${error}`);
				process.exit(1);
			}
		});
	}
	else {
		console.log(text);
	}
}
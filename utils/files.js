const fs = require('fs')
const path = require('path')

// always reads and writes from the perspective of
// this files current location from within the project files

function jsonReader(file, cb) {
	fs.readFile(path.resolve(__dirname, file), 'utf-8', (err, fileData) => {
		if (err) {
			return cb && cb(err)
		}

		try {
			// could modify and write to file here too...
			const obj = JSON.parse(fileData)
			return cb && cb(null, obj)
		} catch (err) {
			return cb && cb(err)
		}
	})
}

function jsonWriter(file, data, stripLastBracket = false, cb) {
	let dataString = JSON.stringify(data, null, 2)
	if (stripLastBracket) {
		dataString = dataString.slice(0, -1)
	}

	fs.writeFile(path.resolve(__dirname, file), dataString, 'utf8', (err) => {
		if (err) {
			console.log(err)
			return cb && cb(err)
		}
		return cb
	})
}

function jsonAppend(file, data, pre = '') {
	let stream = fs.createWriteStream(path.resolve(__dirname, file), {
		flags: 'a',
	})

	stream.write(pre + JSON.stringify(data, null, 2) + '\n')

	stream.end()
}

module.exports = { jsonReader, jsonWriter, jsonAppend }

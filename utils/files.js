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
			const obj = JSON.parse(fileData)
			return cb && cb(null, obj)
		} catch (err) {
			return cb && cb(err)
		}
	})
}

function jsonWriter(file, data, cb) {
	fs.writeFile(
		path.resolve(__dirname, file),
		JSON.stringify(data, null, 2),
		(err) => {
			if (err) {
				console.log(err)
			}
		}
	)
}

module.exports = { jsonReader, jsonWriter }

const express = require('express')
const router = express.Router()
const { jsonReader, jsonWriter } = require('../utils/files')
const checkFriendCompatibility = require('../utils/friendCompare')
const { toCapsFirstEachWord } = require('../utils/generalUtils')

// ***loads friends from memory referencing data from file path***
// const fs = require('fs')
// const path = require('path')
// const filePath = '../data/'
// const resolvedPath = path.resolve(__dirname, filePath)
// const friends = require(path.join(resolvedPath, 'friends'))

//loads friends from file
let friends = []

jsonReader('../data/friends.json', (err, data) => {
	if (err) {
		console.log(err)
	} else {
		// console.log(`Data read from file: ${JSON.stringify(data)}`)
		friends = data

		// modify the read in data and write it out for fun...
		// data[0].title = 'NEW TEST adding a new property and value'
		// jsonWriter('../data/output.json', data)
	}
})

router
	.route('/friends')
	.get(function (req, res) {
		return res.json(friends)
	})
	.post(function (req, res) {
		let newFriend = req.body

		// remove spaces from newFriend
		newFriend.name = toCapsFirstEachWord(newFriend.name)
		// decode the url used for the photo
		newFriend.photo = decodeURIComponent(newFriend.photo)

		// add new friend
		friends.push(newFriend)
		// console.log('amended friends list:')
		// console.log(JSON.stringify(friends))
		jsonWriter('../data/friends.json', friends)

		let bestMatch = checkFriendCompatibility(newFriend, friends)
		if (bestMatch) {
			res.json(bestMatch)
		} else {
			res.status(404).json('Not enough friends to identify a best match.')
		}
	})

router
	.route('/friends/:name')
	.all(function (req, res, next) {
		let name = req.params.name
		let friend = name[0].toUpperCase() + name.slice(1).toLowerCase()
		req.friendName = friend
		next()
	})
	.get(function (req, res) {
		for (let i = 0; i < friends.length; i++) {
			if (friends[i].name.toUpperCase() === req.friendName.toUpperCase()) {
				return res.json(friends[i])
			}
		}

		return res
			.status(404)
			.json('No friend found by the name of ' + req.params.name)
	})

module.exports = router

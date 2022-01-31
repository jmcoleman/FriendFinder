const express = require('express')
const router = express.Router()
const path = require('path')

// handle reference to data file path
const filePath = '../data/'
const resolvedPath = path.resolve(__dirname, filePath)
const friends = require(path.join(resolvedPath, 'friends'))

router
	.route('/friends')
	.get(function (req, res) {
		return res.json(friends)
	})
	.post(function (req, res) {
		let newFriend = req.body

		// remove spaces from newFriend
		newFriend.name = newFriend.name.replace(/\s+/g, '')
		friends.push(newFriend)

		// friend compatibility logic
		var compatibilityDifference = []
		var friendMatchValue = 0
		var bestMatch = {}
		var bestMatchScore = 999

		// loop thru friends to determine compatibility of each
		for (i = 0; i < friends.length; i++) {
			if (newFriend.name !== friends[i].name) {
				// loop thru all scores of friend to come up with the compatibility
				for (j = 0; j < friends[i]['scores'].length; j++) {
					compatibilityDifference[j] = Math.abs(
						parseInt(newFriend['scores'][j]) - parseInt(friends[i]['scores'][j])
					)
					friendMatchValue += compatibilityDifference[j]
				}

				// keep the best match if lower than current best match
				if (friendMatchValue < bestMatchScore) {
					bestMatch = friends[i]
				}
			}
		}

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

function checkFriendCompatibility(newFriend, friends) {
	// compatibility logic
	let compatibilityDifference = []
	let friendMatchValue = 0
	let bestMatchScore = 999
	let bestMatch = {}

	// loop thru friends to determine compatibility of each
	for (i = 0; i < friends.length; i++) {
		// console.log(`iterate over friends ${i.name}`)
		// console.log(friends[i])

		if (newFriend.name !== friends[i].name) {
			// compare each score
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
	return bestMatch
}

module.exports = checkFriendCompatibility

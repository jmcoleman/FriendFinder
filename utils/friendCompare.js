function checkFriendCompatibility(newFriend, friends) {
	// compatibility logic
	let compatibilityDifference = []
	let friendMatchValue = 0
	let bestMatchScore = 999
	let bestMatch = {}
	let additionalFriendsMatching = 0

	// loop thru friends to determine compatibility of each
	for (i = 0; i < friends.length; i++) {
		friendMatchValue = 0

		if (newFriend.name !== friends[i].name) {
			// compare each score
			for (j = 0; j < friends[i]['scores'].length; j++) {
				compatibilityDifference[j] = Math.abs(
					parseInt(newFriend['scores'][j]) - parseInt(friends[i]['scores'][j])
				)

				// console.log(
				// 	`newFriend: ${parseInt(
				// 		newFriend['scores'][j]
				// 	)} and currentFriend: ${parseInt(friends[i]['scores'][j])}`
				// )
				// console.log(
				// 	`Compatibility difference for ${friends[i].name} question number ${j} is ${compatibilityDifference[j]}`
				// )

				friendMatchValue += compatibilityDifference[j]
			}

			// find the first best match
			if (friendMatchValue <= bestMatchScore) {
				// if is an exact match
				if (friendMatchValue == bestMatchScore) {
					additionalFriendsMatching++
				} else {
					additionalFriendsMatching = 0
					bestMatch = friends[i]
					bestMatchScore = friendMatchValue
				}
			}
		}
		// console.log(`Match value for ${friends[i].name} is ${friendMatchValue}`)
	}
	return {
		...bestMatch,
		moreFriends: additionalFriendsMatching,
		score: bestMatchScore,
	}
}

module.exports = checkFriendCompatibility

function toCapsFirstEachWord(str) {
	return str.replace(
		/(^\w|\s\w)(\S*)/g,
		(_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
	)
}

module.exports = {
	toCapsFirstEachWord,
}

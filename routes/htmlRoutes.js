const express = require('express')
const router = express.Router()
const path = require('path')

const filePath = '../public/'
const resolvedPath = path.resolve(__dirname, filePath)

router.route('/').get(function (req, res) {
	res.sendFile(path.join(resolvedPath, 'home.html'))
})

router.route('/survey').get(function (req, res) {
	res.sendFile(path.join(resolvedPath, 'survey.html'))
})

module.exports = router

const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// serve static folders
app.use(express.static(__dirname + '/public'))

// mount routes
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')

app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

// start listening
app.listen(app.get('port'), function () {
	console.log('listening on port ' + app.get('port'))
})

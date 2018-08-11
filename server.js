// SETUP EXPRESS
var express = require("express");
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

// mount routes
var htmlRoutes = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// start listening
app.listen(app.get('port'), function() {
    console.log("listening on port " + app.get('port'));
});




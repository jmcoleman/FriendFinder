// add npm requires
var express = require("express");
var router = express.Router();
var path = require("path");

var filePath = "./app/public/"
var resolvedPath = path.resolve(filePath);

///////////////
// routes
///////////////
router.route('/')
    .get(function(req, res) {
        res.sendFile(path.join(resolvedPath, "home.html"));
    });

router.route('/survey')
    .get(function(req, res) {
        res.sendFile(path.join(resolvedPath, "survey.html"));
    });

module.exports = router;
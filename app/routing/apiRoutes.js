// add npm requires
var express = require("express");
var router = express.Router();
var path = require("path");

// handle reference to data file path
var filePath = "./app/data/"
var resolvedPath = path.resolve(filePath);
var friends = require(path.join(resolvedPath, "friends"))

// easier use of data from client via JSON in body
var bodyParser = require("body-parser");
var parseUrlEncoded = bodyParser.urlencoded({ extended: false});

///////////////
// routes
///////////////
router.route('/friends')
    .get(function(req, res) {
        return res.json(friends);
    })
    .post(parseUrlEncoded, function(req, res) {
        var newFriend = req.body;
    
        // Using a RegEx Pattern to remove spaces from newFriend.  RegEx Pattern info at https://www.regexbuddy.com/regex.html
        newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();
        console.log(newFriend);
        friends.push(newFriend);
    
        ///////////////////////////////////////
        // handle incoming surver results
        ///////////////////////////////////////



        /////////////////////////////////
        // handle compatibility logic
        /////////////////////////////////


        // TODO change this to the person with the best match
        res.json(newFriend);
    });

router.route('/friends/:name')
    .all(function(req, res, next) {
        var name = req.params.name;
        console.log(name);
        var friend = name[0].toUpperCase() + name.slice(1).toLowerCase();
        // console.log(friend);
        req.friendName = friend;
        next();
    })
    .get(function(req,res) {
        console.log("in get for friendname: " + req.friendName);

        for (var i=0; i < friends.length; i++) {
            if (friends[i].name.toUpperCase() === req.friendName.toUpperCase()) {
                return res.json(friends[i]);
            }
        }

        return res.send("Friend not found.");
    })
    .delete(function(req, res){
        delete friends[req.friendName];
    });

module.exports = router;
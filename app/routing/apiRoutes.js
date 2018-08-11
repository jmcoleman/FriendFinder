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
        // console.log(req.body);

        ///////////////////////////////////////
        // handle incoming survey results
        ///////////////////////////////////////

        // Using a RegEx Pattern to remove spaces from newFriend.  RegEx Pattern info at https://www.regexbuddy.com/regex.html
        newFriend.name = newFriend.name.replace(/\s+/g, "");
        // console.log(newFriend);
        friends.push(newFriend);
    
        /////////////////////////////////
        // handle compatibility logic
        /////////////////////////////////
        var compatiblityDifference = [];
        var friendMatchValue = 0;
        var bestMatch = {};
        var bestMatchScore = 999;

        // loop thru all friends to determine compatibility of each
        for (i=0; i<friends.length; i++) {
            if (newFriend.name !== friends[i].name) {

                // make sure referencing everything ok
                // console.log("friends i name: " + friends[i].name);
                // console.log("scores of friend to compare: " + friends[i]["scores[]"]);
                // console.log("score length: " + friends[i]["scores[]"].length);

                // loop thru all scores of friend to come up with the compatiblity
                for (j=0; j < friends[i]["scores[]"].length; j++) {
                    compatiblityDifference[j] = Math.abs(parseInt(newFriend["scores[]"][j]) - parseInt(friends[i]["scores[]"][j]));
                    // console.log("diff");
                    // console.log(compatiblityDifference[j]);
                    friendMatchValue += compatiblityDifference[j];
                }

                // keep the best match if lower than current best match
                if (friendMatchValue < bestMatchScore) {
                    bestMatch = friends[i];
                }
            }
        }

        // console.log("best match score: " + bestMatchScore);
        // console.log("friendMatchValue: " + friendMatchValue);

        // console.log("NEW friend");
        // console.log(newFriend);
        // console.log("best friend");
        // console.log(bestMatch);

        if (bestMatch) {
            res.json(bestMatch);
        } else {
            res.status(404).json("Not enough friends to identify a best match.");
        }
    });

router.route('/friends/:name')
    .all(function(req, res, next) {
        console.log("in all");
        var name = req.params.name;
        // console.log(name);
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

        return res.status(404).json("No friend found by the name of " + req.params.name);
    });
    // .delete(function(req, res){
    //     console.log("in delete");
    //     delete friends[req.friendName];
    // });

module.exports = router;
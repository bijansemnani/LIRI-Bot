require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(JSON.stringify(spotify,null,2));
console.log(JSON.stringify(client,null,2));

require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var option = process.argv[2];

if(option === "my-tweets"){
  client.get('statuses/user_timeline', {screen_name: 'beeej236',count:'20'},
  function(error, tweets, response) {
    for (var i = 0; i < tweets.length; i++) {
      console.log("-------------------------");
      console.log(tweets[i].text);
    }
  });
}

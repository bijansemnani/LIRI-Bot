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

if (option === "spotify-this-song") {
  var track;
  if(process.argv.length > 4){
    process.argv.splice(0,3);
    track = process.argv.join(" ");
  } else {
    track = process.argv[3];
  }
  if (track === undefined) {
    track = "The Sign";
  }
  spotify.search({ type: 'track', query: track, limit: 10 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("Artist: " + data.tracks.items[i].artists[0].name);
      console.log("Track Name: " + data.tracks.items[i].name);
      console.log("Track Preview: " + data.tracks.items[i].album.external_urls.spotify);
      console.log("Track Album: " + data.tracks.items[i].album.name);
      console.log("----------------------------------------------------");
    }
  });
}

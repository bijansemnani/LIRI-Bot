require("dotenv").config();

var request = require("request");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var option = process.argv[2];

function spotifySearch(track) {
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
  spotifySearch(track);
}

if(option === "movie-this"){
  var movieName;
  if(process.argv.length > 4){
    process.argv.splice(0,3);
    movieName = process.argv.join(" ");
  } else {
    movieName = process.argv[3];
  }
  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  }
  console.log(movieName);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var movie = JSON.parse(body);
      console.log("Title: " + movie.Title);
      console.log("-------------------------------------------------");
      console.log("Release Year: " + movie.Year);
      console.log("-------------------------------------------------");
      console.log("IMDB Rating: " + movie.imdbRating);
      console.log("-------------------------------------------------");
      console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
      console.log("-------------------------------------------------");
      console.log("Country: " + movie.Country);
      console.log("-------------------------------------------------");
      console.log("Language: " + movie.Language);
      console.log("-------------------------------------------------");
      console.log("Plot: " + movie.Plot);
      console.log("-------------------------------------------------");
      console.log("Actors: " + movie.Actors);
      console.log("-------------------------------------------------");
    }
  });
}

if (option === "do-what-it-says") {
  fs.readFile("random.txt","utf8", function (err,data) {
    if (err) {
      return console.log(error);
    }
    var array = data.split(",");
    var track = array[1];
    spotifySearch(track);
  });
}

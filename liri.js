// require API keys to keep hidden on Github
require("dotenv").config();

// require read random.txt
var fs = require("fs");

// require to import spotify API
var Spotify = require('node-spotify-api');

// require to read keys.js which reads in all of the APIs
var keys = require("./keys.js");

// require to read OMBD and Bands in TOwn APIs
var request = require("request");

// require to format dates
var moment = require("moment");

// command line arguments
var command = process.argv[2];

// user able to input command by adding blank string
var input = "";
var title = "";

// take in all of the title
for (var i = 3; i < process.argv.length; i++) {
  input = (title + " " + process.argv[i] + "")
  title = title + "-" + process.argv[i];
}

// Spotify
function spotifySong(qry) {
  spotifySong.search({ type: 'track', query: itemSearch }, 
  function (err, response) {
    if (err) {
      return
      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log('Error occurred: ' + err);
      console.log("^^^^^^^^^^^^^^^^^^^^^^");
    }
  // hold Spotify Response
  var spotifyData = data.tracks.items;
  var artist = spotifyData[0].artists[0].name;
  var song = spotifyData[0].name;
  var previewURL = spotifyData[0].preview_url;
  var album = spotifyData[0].album.name;

  console.log("vvvvvvvvvvvvvvvvvvvvvv");
  console.log("Input: ", + input);
  console.log("Artist: ", + artist);
  console.log("Song: ", + song);
  console.log("Preview URL: ", + previewURL);
  console.log("Album: ", + album);
  console.log("^^^^^^^^^^^^^^^^^^^^^^");
  });


  fs.appendFile('log.txt', 
    "\r\n" + "Spotify Song: " + "Input: " + input +
    "\r\n" + "Artist: " + artist + "\r\n" + "Song: " + song +
    "\r\n" + "Preview URL: " + preview_url +
    "\r\n" + "Album: " + album +
    "\r\n", (err) => {
      if (err) throw err;
      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log('log.txt updated');
      console.log("^^^^^^^^^^^^^^^^^^^^^^");
    });
};
spotifySong
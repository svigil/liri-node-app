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

// required to retrieve Spotify/OMDB/Bands in Town keys from keys.js file 88888
var spotify = new Spotify(keys.spotify);

// command line arguments
var command = process.argv[2];

// user able to input command by adding blank string
var input = "";
var title = "";

// take in all of the title
for (var i = 3; i < process.argv.length; i++) {
  input = title + " " + process.argv[i].replace(/-/g, "");
  title = title + "-" + process.argv[i];
}


// Spotify
function spotifySong(qry) {
  spotify.search({ type: 'track', query: itemSearch }, function (err, data) { 
      if (err) {

          console.log("vvvvvvvvvvvvvvvvvvvvvv");
          console.log('Error occurred: ' + err);
          console.log("^^^^^^^^^^^^^^^^^^^^^^");
          return console.log(err);
      }

      //var to hold spotify API response
      var spotifyInfo = data.tracks.items;
      var artists = spotifyInfo[0].artists[0].name;
      var songsName = spotifyInfo[0].name;
      var previewLink = spotifyInfo[0].preview_url;
      var albumName = spotifyInfo[0].album.name;

      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log("\r\n" + "User Input: " + input);
      console.log("\r\n" + "Artist(s): " + artists);
      console.log("\r\n" + "Song's Name: " + songsName);
      console.log("\r\n" + "Preview Link: " + previewLink);
      console.log("\r\n" + "Album Name: " + albumName);
      console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");

      // BONUS: update log.txt file
      fs.appendFile('log.txt', 
      "\r\n" + "Search Term: " + input +
      "\r\n" + "Artist(s): " + artists + 
      "\r\n" + "Song's Name: " + songsName + 
      "\r\n" + "Preview Link: " + previewLink + 
      "\r\n" + "Album Name: " + albumName + 
      "\r\n", (err) => {
          if (err) throw err;
          console.log("vvvvvvvvvvvvvvvvvvvvvv");
          console.log('log.txt updated');
          console.log("^^^^^^^^^^^^^^^^^^^^^^");
      });
  });
  spotify
}

// Concert This
function concertThis() {
  request("https://rest.bandsintown.com/artists/" + itemSearch + "/events?app_id=codingbootcamp", function (error, response, data) {
    // request does not work the status code will be 200
    if (!error && response.statusCode === 200) {

      //hold bands-in-town response
      var bITInfo = JSON.parse(data);
      var venueInfo = bITInfo[0].venue;
      var venueName = venueInfo.name;
      var venueLocation = venueInfo.city;

      // convert date to MM/DD/YYYY (must have moment.js)
      var convertedDate = moment(bITInfo[0].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("MM/DD/YY");

      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log("\r\n" + "Input: " + input);
      console.log("\r\n" + "Venue Name: " + venueName);
      console.log("\r\n" + "Venue Location: " + venueLocation);
      console.log("\r\n" + "Concert Date: " + convertedDate);
      console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");

      fs.appendFile('log.txt', "\r\n" + "CONCERT THIS REQUEST: " + "Search Term: " + input +
        "\r\n" + "Venue Name: " + venueName +
        "\r\n" + "Location: " + venueLocation +
        "\r\n" + "Date: " + convertedDate +
        "\r\n", (err) => {
          if (err) throw err;
          console.log("vvvvvvvvvvvvvvvvvvvvvv");
          console.log("\r\n" + 'log.txt updated');
          console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");
        });
    }

    else {
      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log("\r\n" + "Input: " + input);
      console.log("\r\n" + "error: " + error);
      console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");

    }
  });
}

function movieThis() {

  request("https://www.omdbapi.com/?apikey=trilogy&t=" + title, function (error, response, data) {
    // response code must = 200
    if (!error && response.statusCode === 200) {

      //hold OMBD API response
      oMDBInfo = JSON.parse(data);
      var title = oMDBInfo.Title;
      var year = oMDBInfo.Year;
      var iMDBRating = oMDBInfo.Ratings[0].Value;
      var rotTomRating = oMDBInfo.Ratings[1].Value;
      var country = oMDBInfo.Country;
      var language = oMDBInfo.Language;
      var plot = oMDBInfo.Plot;
      var actors = oMDBInfo.Actors;

      console.log("\r\n" + "vvvvvvvvvvvvvvvvvvvvvv");
      console.log("\r\n" + "Input: " + input);
      console.log("\r\n" + "Title: " + title);
      console.log("\r\n" + "Year: " + year);
      console.log("\r\n" + "IMDB Rating: " + iMDBRating);
      console.log("\r\n" + "Rotten Tomatoes Rating: " + rotTomRating);
      console.log("\r\n" + "Country of Production: " + country);
      console.log("\r\n" + "Language: " + language);
      console.log("\r\n" + "Plot: " + plot);
      console.log("\r\n" + "Actors: " + actors);
      console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");

      //log.txt
      fs.appendFile('log.txt', "\r\n" + "MOVIE-THIS REQUEST: " + "Search Term: " + input +
        "\r\n" + "Title: " + title +
        "\r\n" + "Year: " + year +
        "\r\n" + "IMDB Rating: " + iMDBRating +
        "\r\n" + "Rotten Tomoatoes Rating: " + rotTomRating + " " + "Country of Production: " + country + " " + "Language: " + language +
        "\r\n" + "Plot: " + plot +
        "\r\n" + "Actors: " + actors +
        "\r\n", (err) => {
          if (err) throw err;
          console.log("vvvvvvvvvvvvvvvvvvvvvv");
          console.log("\r\n" + 'log.txt updated');
          console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");
        });
    }

    else {
      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      console.log("\r\n" + "Input: " + input);
      console.log("\r\n" + "error: " + err);
      console.log("\r\n" + "^^^^^^^^^^^^^^^^^^^^^^");

    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "UTF-8", function (err, data) {
    var splitRead = data.split(',');
    command = splitRead[0];
    itemSearch = splitRead[1];
    spotifySong(title); spotifySong(title);
  });

}

// switch statement to designate which function to use
switch (command) {
  case "concert-this":
    // remove the "-" with .replace(/-/g,"")
    var itemSearch = title.replace(/-/g, "");
    concertThis();
    break;

  case "spotify-this-song":
    // remove the "-" with .replace(/-/g,"")
    var itemSearch = title.replace(/-/g, "");
    if (title === "") {
      itemSearch = "The Sign Ace of Base"
    }
    spotifySong(title)
    break;

  case "movie-this":
    if (title === "") {
      title = "Fight Club"
    }
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}
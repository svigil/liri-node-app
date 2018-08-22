require("dotenv").config();

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "776fbe8bcf8e4148962b397f612846b8",
  secret: "c84701917bb747afaee7f57058b98e4c"
});
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });


var axios = require("axios");
var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '0addae6531644f53aae06753bf97cc13',
  secret: '8941226b74e54bedb5df18d356557198'
});


inquirer
  .prompt({
    message: "Welcome to LIRI what would you like to do today?",
    type: "list",
    name: "choice",
    choices: ["OMDB", "Spotify", "Bandintown"]
  })
  .then(ans => {
    console.log(ans.choice);
    switch (ans.choice) {
      case "OMDB":
        OMDB();
        break;
      case "Bandintown":
        Bands();
        break;
        case "Spotify":
          getSpotify();
          break;
    }
  })
  .catch(err => console.log(err));

function OMDB() {
  inquirer
    .prompt({
      message: "What year would you like to travel to?",
      type: "input",
      name: "year"
    })
    .then(answer => {
      randArr = ["any", "the", "i", "me"];
      randTerm = randArr[Math.floor(Math.random() * randArr.length)];
      console.log("your random search term is ", randTerm);
      request(
        `http://www.omdbapi.com/?t=${randTerm}&y=${answer.year}&plot=short&apikey=trilogy`,
        function(error, response, body) {
          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log(
              "The movie's rating is: " + JSON.parse(body).imdbRating
            );
            console.log(JSON.parse(body));
          }
        }
      );
    });
  }
  //Bands In Town
  function Bands() {
    inquirer
    .prompt({
      message: "Whose concert are you looking for?",
      type: "input",
      name: "artist"
    }).then(res=>{
      request(
      `https://rest.bandsintown.com/artists/${res.artist}?app_id=codingbootcamp`,
      function(err, res, body) {
        console.log(JSON.parse(body));
      }
    );
    })
  }

  function getSpotify(){
    inquirer.prompt({
      message: "Select a year to hear what was playing on the radio",
      name: "artist",
      type: "input"
    }).then(res=>{
      spotify.search({type:'artist', query:res.artist}, function(err,data){
        if(err){
          console.log(err)
        }
        console.log(data)
        console.log(data.artists.items[0])
      })
    })
  }

  // axios request to run applicationCache
  // Include the request npm package (Don't forget to run "npm install request" in this folder first!)

  // Then run a request to the OMDB API with the movie specified


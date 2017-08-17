//=======================================================
//                     Variables
//=======================================================

//Node Packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require("request");

//External JS files
var keys = require("./assets/javascript/key.js");
var logger = require("./logging.js");
var liriFunctions = require('./liri_functions.js');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

//variables for this file
var twitterCount = 20;
var twitterScreenName = "euclid265";

//=======================================================
//                     Exports
//=======================================================

exports.spotifyFunction = function(ValidCommands, param){
	
	//set default song..
	var song = "uptown funk";
	
	//overwrite default song if necessary
	if(param != "*none provided*"){
		song = param;
	}

	//create spotify variable..
	var spotify = new Spotify({
  		id: "12dc3b04c9b64e51b60ec1197a3313a3",
  		secret: "0b725759bbf7498e9d410e723f560d80"
	});

	//query spotify for the song..
	spotify.search({ type: 'track', query: song }, function(err, data) {
		if (err) {
			return logger.consoleAndLog('Error occurred: ' + err);
		}
		else{
			logger.printSpotifyData(data);
			
			
		}
		
	});	
}
exports.randomFunction = function(ValidCommands, param){
	//read from a file, and expect it in "command, parameter" format
	fs.readFile("random.txt", "utf8", function(error, data) {
		// If the code experiences any errors it will log the error to the console.
		if (error) {
	  		return logger.consoleAndLog(error);
		}
		else{
			var dataArr = data.split(",");
			if(dataArr[0] == "do-what-it-says")
				logger.consoleAndLog("file is trying to call itself");
			else{
		  		exports.executeCommand(ValidCommands, dataArr[0], dataArr[1]);
	  		}
	  		
		}
		
	});
}
exports.movieFunction = function(ValidCommands, param){
	//Set a default movie, in case param is null..
	var movie = "Mr. Nobody";

	//Build query url..
	var movieKey = "40e9cece";
	var url ="http://www.omdbapi.com/?apikey="+movieKey+"&t=";
	//Update the movie var if necessary..
	if(param != "*none provided*"){
		movie = param;
	}
	url += movie;
	var request = require("request");
	request(url, function (error, response, body) {
		
		var bodyObject = JSON.parse(body);
		
		logger.printMovieData(bodyObject);	
		
		
	});
}
exports.twitterFunction = function(ValidCommands, param){
	//build query url..
	var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+twitterScreenName+"&count="+twitterCount;
	
	//Get the data from the twitter api
	client.get(queryUrl,  function(error, tweet, response) {
	  if(error){ 
	  	throw error;
	  }
	  else{
	  	//pass the tweet data to the print method
	  	logger.printTwitterData(tweet);
	  } 
	});
}

//Inputs: ValidCommands - array containing CommandFunc objects
//        command - command passed in from command line
//        param - parameter passed in from command line
exports.executeCommand = function(ValidCommands, command, param){
	var buffer = "";
	var line = "==============================";
	var newLine = "\r\n";
	
	//Flag that will indicate whether the passed command is valid.
	var goodCommandFlag = false;
	
	if(param == undefined){
		param = "*none provided*";
	}
	if(command == undefined){
		command = "*none provided*";
	}
	//log what the user entered..
	buffer += line + newLine;
	buffer += "Input: "+newLine;
	buffer += "Command: " + command+newLine;
	buffer += "Param: " + param+newLine;
	buffer += line + newLine;

	logger.consoleAndLog(buffer);
	
	//Loop through all valid commands..
	for(var i = 0; i < ValidCommands.length; i++){
		//Check if the command that was passed in is equal to the current Valid Command
		if(command == ValidCommands[i].command){
			//If so, set the good command flag to true
			goodCommandFlag = true;

			//Invoke the function associated with that command
			ValidCommands[i].func(ValidCommands, param);
		}
	}

	//Tell the user that the command is invalid
	//List valid commands.
	if(!goodCommandFlag){
		var buffer = "";
		buffer += "Invalid Command: '"+ command+"'\r\n";
		buffer+= "Valid Commands: ";
		for(var i = 0; i < ValidCommands.length; i++){
			if(i ==ValidCommands.length-1){
				buffer += ValidCommands[i].command;
			}
			else
				buffer += ValidCommands[i].command + ", ";
		}
		logger.consoleAndLog(buffer);
	}
}
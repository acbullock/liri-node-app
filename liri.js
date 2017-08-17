//=======================================================
//                     Variables
//=======================================================

//External JS file
var liriFunctions = require("./liri_functions.js");

//More variables for this file
var consoleCommand = process.argv[2];
var consoleParam = process.argv[3];
var ValidCommands;

//=======================================================
//                     Constructor
//=======================================================


//this object contains a command and a corresponding function
var CommandFuncObject = function(command, func){
	this.command = command;
	this.func = func;
}

//Array of CommandFunc objects (objects that have a command string, and a function)
ValidCommands = [new CommandFuncObject("my-tweets", liriFunctions.twitterFunction), new CommandFuncObject("spotify-this-song", liriFunctions.spotifyFunction), new CommandFuncObject("movie-this", liriFunctions.movieFunction), new CommandFuncObject("do-what-it-says", liriFunctions.randomFunction)];

//Execute the command that was passed in from the command line
liriFunctions.executeCommand(ValidCommands, consoleCommand, consoleParam);

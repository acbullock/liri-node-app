var fs = require("fs");
//logs input to the console and to a file (log.txt)
exports.consoleAndLog = function(thingToLog){

	//log to console
	console.log(thingToLog);

	// //add to log file..
	// fs.appendFileSync("log.txt", thingToLog + '\n', function(err) {

	//   // If the code experiences any errors it will log the error to the console.
	//   if (err) {
	//     return console.log(err);
	//   }
	// });
	var x = fs.appendFile("log.txt", thingToLog+'\n');
	
	return thingToLog;
}

//fixed
exports.printSpotifyData = function(data){
	//Print Spotify Results Header..
	var buffer = "";
	var line = "==============================";
	var newLine = "\r\n";
	
	buffer += line + newLine;
	buffer += "Spotify Search Results:" + newLine;
	buffer += line + newLine+newLine;


	var items= data.tracks.items;
	//show message if no results..
	if(items.length == 0){
		buffer += "No Results Found!";
	}
	else{
		
		//Loop through each result..
		for(var i= 0; i < items.length && i < 5; i++){
			//print the result #
			buffer += line + newLine;
			buffer += "========= Result #"+(i+1)+" =========="+ newLine;
			buffer += line + newLine;

			//retreive the artist(s) that correspond to this result (i)
			buffer +="Artists: ";
			var artists = items[i].artists;
			if(artists == undefined){
				artists=[];
				artists.push({name: "None Listed"});
			}
			
			//loop through each item's artists
			for(var j=0; j< artists.length; j++){
				//print each name..
				buffer += artists[j]["name"];
				if(j < artists.length-1)
					buffer += ", ";
			}
			buffer += newLine;
			buffer += line + newLine;
			
			//console each result's song name..
			buffer += "Song Name: "+ data.tracks.items[i]["name"]+ newLine;
			buffer += line + newLine;

			//console each result's preview url..
			var preview = "not provided";
			if(data.tracks.items[i]["preview_url"] != null){
				preivew = data.tracks.items[i]["preview_url"];
			}
			buffer += "Preview URL: " + preview + newLine;
			buffer += line + newLine;

			//console each result's album name..
			buffer += "Album: " + data.tracks.items[i].album["name"]+ newLine;
			buffer += line + newLine;

			//create some space between results..
			buffer += newLine+newLine;
		}
	}
	exports.consoleAndLog(buffer);
}
//fixed for async
exports.printMovieData = function(data){
	var buffer = "";
	var line = "==============================";
	var newLine = "\r\n";

	//Print Movie Results Header..
	buffer += line + newLine;
	buffer += "OMDB Search Results:" + newLine;
	buffer += line + newLine;

	if(data.Response == "False"){
		buffer += "No Results Found!" + newLine;
	}
	else{
		var ratings = data["Ratings"];
		var tomato = "n/a";
		for(var i = 0; i < ratings.length; i++){
			if(ratings[i]["Source"]=="Rotten Tomatoes"){
				tomato = ratings[i]["Value"];
			}
		}	
		buffer += line + newLine; 
		buffer += "Title: ";
		buffer += data.Title + newLine;
		buffer += line + newLine;
		buffer += "Year: ";
		buffer += data.Year + newLine;
		buffer += line + newLine; 
		buffer += "IMDB Rating: " + data["imdbRating"] + newLine;
		buffer += line + newLine; 
		buffer += "Rotten Tomatoes Rating: " +tomato + newLine;
		buffer += line + newLine;
		buffer += "Country: " + data["Country"] + newLine;
		buffer += line + newLine;
		buffer += "Language: " + data["Language"] + newLine;
		buffer += line + newLine;
		buffer += "Plot: " + data["Plot"] + newLine;
		buffer += line + newLine;
		buffer += "Actors: " + data["Actors"] + newLine;
		buffer += line + newLine;
	}	
	exports.consoleAndLog(buffer);
}
//fixed for async
exports.printTwitterData = function(data){
	var buffer = "";
	var line = "==============================";
	var newLine = "\r\n";
	//Print Twitter Results Header..
	buffer+= newLine;
	buffer += "Last 20 tweets by @euclid265" + newLine +line + newLine;
	//Loop through tweets, and print the text and "created at" info..
	for(var i=0; i< data.length; i++){
		buffer+="Tweet #" +(i+1)+newLine;
  		buffer+="Text: '"+data[i].text+"'"+newLine;
  		buffer+="Created At: "+ data[i].created_at+newLine;
  		buffer+=newLine;
  		buffer+=newLine;
  	}
  	exports.consoleAndLog(buffer);

}

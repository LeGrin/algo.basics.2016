const request = require('sync-request');
var url = 'http://api.football-data.org/v1/competitions/398/teams';
var games = {};
var numberOfGames = 0;
var teams = [];
var result_table = [];
var responses = [];


function fill_table(teams){
	for (var r = 0;r < 16;r++){
		result_table[r] = [];
		for (var c = 0; c < 16; c++){
			result_table[r][c] = search(r,c) ? '+': '-';
		}
		
	}
	for (var t = 1; t < 16; t++){
		result_table[0][t] = teams[t];
		result_table[t][0] = teams[t];
	}
	//console.log(result_table);
}

function new_game(teamA,teamB){
	if (teamA == teamB) return false;
	if (games[numberOfGames] == undefined) {
		games[numberOfGames] = [];
	}
	games[numberOfGames].push(teamA,teamB);	
	numberOfGames++;
	return true;
}

function search(teamA,teamB){
	for(var g = 0; g < numberOfGames; g++){
		var currentValue = games[g];

		if (currentValue[0] === teamA && currentValue[1] === teamB) return true;
		if (currentValue[1] === teamA && currentValue[0] === teamB) return true;

	}
	return false;
}

function getTeams(){
	var fbResponse = JSON.parse(request('GET', url).getBody());
	for(var t = 0; t <= 16; t++){
	   	teams.push(fbResponse['teams'][t]['name']);
	}   
	return teams;
}


function generate_Request(teams){
	var searches = 0;
	var newgames = 0;
	for(var request = 0; request < 300; request++){
			var type = (searches != 150 || newgames != 150) ? Math.round(Math.random()) : ( (searches != 150) ? 0:1 )
			var teamA = Math.round(Math.floor(Math.random() * (0 + 16)));
			var teamB = Math.round(Math.floor(Math.random() * (0 + 16)));


			if (type){
				if (request > 290) responses.push('Add new game between ' + teams[teamA] + ' and ' + teams[teamB]);
				 if (new_game(teamA,teamB))	{newgames++} else{request--};
			}
			else{
				if (request > 290) responses.push('Game between ' + teams[teamA] + ' and ' + teams[teamB] + ( search(teamA,teamB) ? ' occurred' : ' not occurred' ));
				//search(teamA,teamB);
				searches++;
			}

	}
	//console.log(games);
	
}


function generate_html_table(inputarray){
	output = "<table style='border-collapse: collapse;font-size:30%;height:100%;width:100%'>\n";
	for (var j = 0; j < 17; j++){
		output += "\t<tr>\n";
		for (var i = 0; i < 17; i++){
			output += generate_cell(j,i);
		}

		output += "\t</tr>\n";
	}
	output += "</table>\n";
	responses.forEach(function(currentItem){
		output += '<p>' + currentItem + '</p>';
		
	});
	return output;
}


function generate_cell(r,c){

	if (r == 0 || c == 0){
		if (r == 0 && c == 0){
			output = "\t\t<th style='";
			output += "'";
			output += ">\n" + '<p>' + '' + '</p>\n</th>\n'; 
		}
		else{
			output = "\t\t<th style='";
			output += (r == 0 ? "width:10%;height:100%'":"width:100%;height:10%'");
			output += ">\n" + '<p' + (r==0? " class = ''":' ') 
			+'>' + teams[(r == 0? c-1:r-1)] + '</p>\n</th>\n'; 
		}
	}
    else{
    	output = "\t\t<td style='padding: 0px;border:1px solid black;border-spacing: 1px;";
	    output +=  "width:";
	    output += Math.round(200/17,0);
	    output += "px;height:";
	    output += Math.round(200/17,0);
	    output += "px'>\n" + (search(r,c)? '+':'-') + '</td>\n' ;
    }
    return output;
}

//console.log('getting teams');
teams = getTeams();
//console.log('teams gotten ' + teams.length);
generate_Request(teams);
fill_table(teams);
//console.log(responses);
//console.log(teams);
console.log(generate_html_table());



//generate_Request(teams);


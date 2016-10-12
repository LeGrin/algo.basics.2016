var matrix = [];
var number = +process.argv[2];

function generate_green_tree(number){


	stop = 0;
	for (var i=number-1;i>=0;i--){
		matrix[i] = [];
		for (var j = 0; j < number; j++){
			if (j >= stop && j < number - stop){
				matrix[i][j] = 1;
			}
			else{
				matrix[i][j] = 0;
			}
		}
		if (number-((stop+1)*2) >= 1){
			stop += 1;
		}
	}

}


function generate_html_table(inputarray){
	output = "<table class='green-tree square-table'>\n";
	for (var j = 0; j < number; j++){
		console.log(inputarray[4]);
		output += "\t<tr>\n";
		for (var i = 0; i < number; i++){
			console.log(inputarray[j][i]);
			output += generate_cell(inputarray[j][i]);
		}

		output += "\t</tr>\n";
	}
	output += "</table>\n";
	return output;
}


function generate_cell(isFilled){
	output = "\t\t<td class='";
	if (!isFilled){
		output += "filled-zero-cell";
	}
	else{
		output += "filled-one-cell";
	}
	output +=  "' width='";
	output += Math.round(200/number,0);
	output += "' heights='";
	output += Math.round(200/number,0);
	output += "' />\n";
	return output;
}


generate_green_tree(number)
console.log(matrix)
console.log(generate_html_table(matrix))
console.log(matrix)
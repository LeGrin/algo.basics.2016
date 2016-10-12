var matrix = [];
var number = +process.argv[2];

function generate_gradient(number){
	for (var i=0;i<number;i++){
		matrix[i] = [];
		for (var j = 0; j < number; j++){
			matrix[i][j] = i+j;
		}
		
	}

}


function generate_html_table(inputarray){
	output = "<table style='height:200px;width:200px;' >\n";
	for (var j = number-1; j >= 0; j--){
		output += "\t<tr>\n";
		for (var i = 0; i < number; i++){
			output += generate_cell(inputarray[j][i]);
		}

		output += "\t</tr>\n";
	}
	output += "</table>\n";
	return output;
}


function generate_cell(isFilled){
	output = "\t\t<td style='";
	color =256-isFilled%256;
	output += "background-color:rgb(" + color + ',' + color + ',' + color + ');';
	output +=  "width:";
	output += Math.round(200/number,0);
	output += "px;height:";
	output += Math.round(200/number,0);
	output += "px' />\n";
	return output;
}


generate_gradient(number)
console.log(generate_html_table(matrix))
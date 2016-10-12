var matrix = [];
var number = +process.argv[2];

function generate_gradient(number){
	for (var i=0;i<number;i++){
		matrix[i] = [];
		for (var j = 0; j < number; j++){
			matrix[i][j] = 0;
		}
		
	}
	move_row(0,0,1);

}

function move_row(i,j,current){
	dx = [1,0,-1,0];
	dy = [0,1,0,-1];
	div_int = 0;
	for (var n = number*number; n > 0; n--){

			matrix[i][j] = current;
			//console.log(''+i+j+current);
			current++;
			i += dx[div_int];
			j += dy[div_int];
			if (matrix[i] == undefined || matrix[i][j] == undefined || matrix[i][j] != 0){
				i -= dx[div_int];
				j -= dy[div_int];
				//console.log(matrix);
				div_int = (div_int+1)%4;
				i += dx[div_int];
				j += dy[div_int];
			}

	}


}





function generate_html_table(inputarray){
	output = "<table style='border:1px solid black;height:200px;width:200px'>\n";
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
	output +=  "border:1px solid black;width:";
	output += Math.round(200/number,0);
	output += "px;height:";
	output += Math.round(200/number,0);
	output += "px;'>\n\t\t\t";
	output += isFilled + '</td>\n'
	return output;
}


generate_gradient(number)
//console.log(matrix)
console.log(generate_html_table(matrix))
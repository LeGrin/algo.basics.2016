var matrix = [];
var step = +process.argv[2];
var depth = +process.argv[3];
var size = 243;

function generate_fractal(){
	for (var i=0;i<size;i++){
		matrix[i] = [];
		for (var j = 0; j < size; j++){
			matrix[i][j] = 0;
		}
		
	}
	var currentstep = size/step;
	for (var d = 0; d < depth; d++)
	{
		for (var i = currentstep; i < size; i += currentstep*3){
			for (var j = currentstep; j < size; j += currentstep*3){

				if (matrix[i] != undefined && matrix[i][j] == 0)
				{
					for (var r = i; r < i+currentstep; r++){
						for (var c = j; c < j+currentstep; c++){
							matrix[r][c] = 1;
						}
					}
				}
			}
		}
	currentstep = Math.round(currentstep/step);

	}

}


function generate_html_table(inputarray){
	output = "<table cellspacing='0' cellpadding='0' border='0' style='height:243px;width:243px;' >\n";
	for (var j = size-1; j >= 0; j--){
		output += "\t<tr>\n";
		for (var i = 0; i < size; i++){
			output += generate_cell(inputarray[j][i]);
		}

		output += "\t</tr>\n";
	}
	output += "</table>\n";
	return output;
}


function generate_cell(isFilled){
	output = "\t\t<td style='";
	color = 256*isFilled;
	output += "background-color:rgb(" + color + ',' + color + ',' + color + ');';
	output +=  "width:";
	output += Math.round(200/size,0);
	output += "px;height:";
	output += Math.round(200/size,0);
	output += "px' />\n";
	return output;
}


generate_fractal()
//console.log(matrix);
console.log(generate_html_table(matrix));
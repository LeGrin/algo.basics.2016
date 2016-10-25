var field = [];
var size = 550;
var parts = [];

function gererateRectangles(){
	for (var a = 1; a < 11; a++){
		for (var b = 1; b < 11; b++){
			parts.push([a,b]);
		}
	}
}

function fillField(){
	for (var r = 0; r < size; r++){
		for (var c = 0 ; c < size; c++){
			if (field[r] === undefined){
				field[r] = [];
			}
			field[r][c] = 0; 
		}
	}
}

function checkPart(rectangle,r,c){
	if (r+rectangle[0] > size || c + rectangle[1] > size) return false;
	for (var i = r; i < r + rectangle[0]; i++){
		for (var j = c; j < c + rectangle[1]; j++){
			if (field[i][j] !== 0) {
				return false;
			}
		}
	}
	return true;
}

function findAndPlace(rectangle){
	for (var r = 0; r < size; r++){
		for (var c = 0 ; c < size; c++){
			if(checkPart(rectangle,r,c)){
				console.log(r,c);
				console.log(field[r][c]);
				console.log(rectangle);

				for(var i = r; i < r +  rectangle[0]; i ++){
					for(var j = c; j < c +  rectangle[1]; j ++){
						if( i === r || j === c || j === c + rectangle[1] - 1 || i === r + rectangle[0]-1){
							field[i][j] = 0.5;
						} 
						else {field[i][j] = 1;}
					}	
				}
				return true;
			}
		}
	}
	return false;
}


function placeParts(listOfParts){
	listOfParts.forEach(function(currentItem){
		var newList = listOfParts.slice();
		newList.splice(newList.indexOf(currentItem),1);
	});

}

function generate_html_table(inputarray){
	output = "<table cellspacing='0' frame='box' cellpadding='0' border='0' style='height:550px;width:550px;' >\n";
	for (var r = size-1; r >= 0; r--){
		output += "\t<tr>\n";
		for (var c = 0; c < size; c++){
			output += generate_cell(inputarray[r][c]);
		}

		output += "\t</tr>\n";
	}
	output += "</table>\n";
	return output;
}


function generate_cell(isFilled){
	output = "\t\t<td style='";
	color = 256*(1-isFilled);
	output += "background-color:rgb(" + color + ',' + color + ',' + color + ');';
	output +=  "width:";
	output += 1;
	output += "px;height:";
	output += 1;
	output += "px' />\n";
	return output;
}


fillField();
gererateRectangles();





console.log(generate_html_table(field));

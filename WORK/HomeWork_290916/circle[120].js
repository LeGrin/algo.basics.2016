var matrix = [];
var number = +process.argv[2];
//var number = 7;

function generate_gradient(number){
	for (var i=0;i<number;i++){
		matrix[i] = [];
		for (var j = 0; j < number; j++){
			matrix[i][j] = 0;
		}
		
	}
	draw_circle()
}


function draw_circle()
{
    var rad = Math.round(number/2);
    var even = 0;
    var steps = [[1,0],[0,1],[0,-1]];
    var aproximation = (Math.PI)/10;
    if (number%2==0){
        even = 1;
        aproximation = (2*Math.PI)/10;
    }
    //console.log('even:' + even + ' rad: ' + rad);
    var center = {'x':rad-1,'y':rad-1};
    for (var r = 0; r < number; r++){
        for(var c = 0; c < number; c++){
            var point = {'r':r,'c':c};
            if (even){
                if (point.c > number/2-1){
                    center.y = rad;
                }
                if (point.c <= number/2-1){
                    center.y = rad-1;
                }
                if(point.r > number/2-1){
                    center.x = rad;
                }
                if(point.r <= number/2-1){
                    center.x = rad-1;
                }
            }
            var distance = lineDistance(center,point);
            if (distance <= rad-aproximation){
                //console.log(distance);
                matrix[r][c] = 1;
            }

        }
    }
    add_border();

}

function add_border(){
    for (var r = 0; r < number; r++){
        for(var c = 0; c < number; c++){
            if(matrix[r][c] == 1){
                if (r == number-1 || c == number-1 || r ==0 || c == 0 || matrix[r-1][c] == 0 || matrix[r][c-1] == 0 || matrix[r+1][c] == 0 ||matrix[r][c+1] == 0)
                {
                    matrix[r][c] = 2;
                }
            }

        }
    } 
}

function lineDistance( point1, point2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = point2.r - point1.x;
  xs = xs * xs;
 
  ys = point2.c - point1.y;
  ys = ys * ys;
  return Math.sqrt( xs + ys );
  //return(Math.abs(point1.x-point2.r) + Math.abs(point1.y-point2.c))
}



function generate_html_table(inputarray){
	output = "<table style='height:200px;wirth:200px'>\n";
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
    if (isFilled == 2){
        output += "background-color:black;";
    }
    if (isFilled == 0){
        output += "background-color:white;";
    }
        if (isFilled == 1){
        output += "background-color:blue;";
    }
    output +=  "width:";
    output += Math.round(200/number,0);
    output += "px;height:";
    output += Math.round(200/number,0);
    output += "px' />\n";
    return output;
}


generate_gradient(number)
//console.log(matrix)
console.log(generate_html_table(matrix))
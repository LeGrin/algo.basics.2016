var solutionsTwo = {};
var solutionAny = {};
var number = +process.argv[2];
var abc = +process.argv[3];
var log = (+process.argv[3] === 'l');
var operations = ['+','-','*','/'];
if (log)  console.log(number,abc,log);


function solve_two(){
	if (log) console.log('#######################\nCREATING BASE DICTIONARY\n#######################')
	for (var a = 0; a < 100; a++){
		for (var b =0; b < 100; b++){
			push_new(solutionsTwo,a+b,[a,'+',b]);
			push_new(solutionsTwo,a-b,[a,'-',b]);
			push_new(solutionsTwo,a*b,[a,'*',b]);
			push_new(solutionsTwo,a/b,[a,'/',b]);
		}
	}
	if (log) console.log('#######################\nBASE DICTIONARY CREATED\n#######################')

}

function solver_any(currentDepth,tail){
	//var currentDepth = depth;
	if (log) console.log('######\nNEW ITERATION WITH DEPTH ' + currentDepth + ' AND TAIL ' + tail + '\n###############');
	if(currentDepth < (abc*2)-1){
		if(currentDepth%2===0)
		{
			for (var n = 0; n <10; n ++){
				if (log) console.log(currentDepth);
				solver_any(currentDepth + 1,tail + n);
			}
		}
		else{
			operations.forEach(function(currentOperation){
				if (log) console.log(currentDepth);
				solver_any(currentDepth + 1,tail + currentOperation);
			});
		}
	}
	else{
		if (eval(tail) === number){
			push_new(solutionAny,number,tail);
			if (log) console.log('VALUES RESETED' + tail + currentDepth)
			return;
		}
		
	}
}

function push_new(dictionary,result,values){
	var newValue = values.slice(); 
	if (log) console.log('PUSHING IN ' + result + ': ' + newValue);
	if (dictionary[result] == undefined) {
		dictionary[result] = [];
		dictionary[result].push(newValue);
	}
	else{
		dictionary[result].push(newValue);	
	}
	if (log) console.log('VALUE PUSHED. DICTIONARY KEY:' + result + ' VALUE:' + dictionary[result]);
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


//solve_two();
solver_any(0,['']);
if (log) console.log(solutionAny[number]);
console.log('<div style="width: 100%; height: 100%; overflow-y: scroll;">');
/**solutionsTwo[number].forEach(function(currentValue,index,arr){
	if (log) console.log(currentValue[0] + ' ' +  currentValue[1] + ' ' +  currentValue[2] + ' = ' + number + '</br>');
});
if (log) console.log('</div>')**/
solutionAny[number].forEach(function(currentValue,index,arr){
	var result = currentValue;
	console.log(result + ' = ' + number + ((index+1)%4===0 ?';</br>' : '; ||') );
});
//console.log('</div>')
console.log(solutionAny[number].length)
//if (log) console.log(generate_html_table(matrix))
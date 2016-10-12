var solutionsTwo = {};
var solutionAny = {};
var number = +process.argv[2];
var abc = +process.argv[3];
var log = +process.argv[4] == 'l' ? 1:0;


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

function solver_any(depth,tail){
	var currentDepth = depth;
	if (log) console.log('######\nNEW ITERATION WITH DEPTH ' + currentDepth + ' AND TAIL ' + tail + '\n###############');
	if(depth < abc-1){
		for(var item = 0; item < tail.length; item++)
		{
			if (typeof tail[item] == 'number'){
				
				solutionsTwo[tail[item]].forEach(function(currentTarget){

					var temp = tail[item];
					tail.splice(item,1,'(');
					
					var toDelete = 0;
					for (var subItem = 0; subItem < currentTarget.length; subItem++){
						tail.splice(item+subItem+1,0,currentTarget[subItem]);
						toDelete++;
					}
					tail.splice(item+toDelete+1,0,')');
					if (log) console.log('spliced tail: ' + tail);
					solver_any(currentDepth+1,tail);
					tail.splice(item,toDelete+2,temp);
					if (log) if (log) console.log('restored tail: ' + tail);
				});
			}
		}
	}
	else{
		for(var item = 0; item < tail.length; item++)
		{
			if (typeof tail[item] == 'number'){
				if (log) console.log('FINAL TREE WITH TAIL: ' + tail[item]);
				solutionsTwo[tail[item]].forEach(function(currentTarget){
					if (log) console.log('TREE ITEM: ' + currentTarget);
					var temp = tail[item];
					tail.splice(item,1,'(');
					
					var toDelete = 0;
					for (var subItem = 0; subItem < currentTarget.length; subItem++){
						tail.splice(item+subItem+1,0,currentTarget[subItem]);
						toDelete++;
					}
					tail.splice(item+toDelete+1,0,')');
					if (log) console.log('spliced tail: ' + tail);
					push_new(solutionAny,number,tail);
					tail.splice(item,toDelete+2,temp);
					if (log) console.log('restored tail: ' + tail);
				});
			}
		}
		return;
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


solve_two();
solver_any(0,[number]);
console.log('<div style="width: 200px; height: 200px; overflow-y: scroll;">');
/**solutionsTwo[number].forEach(function(currentValue,index,arr){
	if (log) console.log(currentValue[0] + ' ' +  currentValue[1] + ' ' +  currentValue[2] + ' = ' + number + '</br>');
});
if (log) console.log('</div>')**/
solutionAny[number].forEach(function(currentValue,index,arr){
	var result = '';
	var test = '';
	currentValue.forEach(function(symbol){
		result += symbol + ' ';
		test += symbol;
	})
	//console.log(result + ' = ' + number + '</br> ' + (eval(test) == number ? '':'############ERROR############'));
});
//console.log('</div>')
console.log(solutionAny[number].length)
//if (log) console.log(generate_html_table(matrix))
import sys

number = int(sys.argv[1])
Matrix = [[0 for x in range(number)] for y in range(number)] 

def generate_green_tree(number):
	stop = 0
	for i in reversed(range(0,number)):
		for j in range(0,number):
			if (j >= stop and j < number - stop):
				Matrix[i][j] = 1
				print ("i: " + str(i) + " j: " + str(j) + " stop: " + str(stop) + " filled")
			else:
				Matrix[i][j] = 0
				print ("i: " + str(i) + " j: " + str(j) + " stop: " + str(stop) + "not filled")
		if (number-((stop+1)*2) >= 1):
			stop += 1


def generate_html_table(inputarray):
	output = "<table class='green-tree square-table'>\n"
	for j in range(0,number):
		output += "\t<tr>\n"
		for i in range(0,number):
			output += generate_cell(inputarray[j][i]);

		output += "\t</tr>\n"
	output += "</table>\n"
	return output


def generate_cell(isFilled):
	output = "\t\t<td class='"
	if isFilled:
		output += "filled-zero-cell"
	else:
		output += "filled-one-cell"
	output +=  "' width='"
	output += str(int(round(200/number,0)))
	output += "' heights='"
	output += str(int(round(200/number,0)))
	output += "' />\n"
	return output


generate_green_tree(number)
print generate_html_table(Matrix)
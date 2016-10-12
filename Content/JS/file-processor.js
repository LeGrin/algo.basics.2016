
var dirTree = require('directory-tree');


//$(document).ready(getAllFiles());

function getAllFiles(){
	var WorkItems = 0;
	var tree = dirTree('../../WORK', ['.jpg', '.png', '.gif', '.js']);
	for (folder of tree.children){
		var type = folder.name.substr(0,folder.name.indexOf('_'));
		var date = folder.name.substr(folder.name.indexOf('_')+1);
		var fulldate = (new Date('20'+date[4]+date[5], date[2] +date[3], date[0]+date[1])).toDateString();
		var html = '<section id="portfolio">' + newLineWithTabs(1) 
		+'<div class="container">' + newLineWithTabs(2) 
		+ '<div class="row">' + newLineWithTabs(3) + '<div class="col-lg-12 text-center">' 
		+ newLineWithTabs(4) + '<h2>';
		html += (type == 'ClassWork' ? 'Class Work' : 'Home Work') + ' ' + fulldate;
		html += '</h2>' + newLineWithTabs(4) + '<hr class="star-primary">' + newLineWithTabs(3) 
		+ '</div>' + newLineWithTabs(2) + '</div>' + newLineWithTabs(2) + '\n';

		for (file of folder.children){
			html += newLineWithTabs(2) + '<div class="row">' + newLineWithTabs(3) + '<div class="col-sm-4 portfolio-item">' 
			+ newLineWithTabs(4) + '<a href="#portfolioModal' + WorkItems++ + ' class="portfolio-link" data-toggle="modal">'
			+ newLineWithTabs(5) + '<div class="caption">' + newLineWithTabs(6) + '<div class="caption-content">'
            + newLineWithTabs(7) + '<i class="fa fa-search-plus fa-3x"></i>' + newLineWithTabs(6) 
            + '</div>' + newLineWithTabs(5) + '</div>' + newLineWithTabs(5) 
            + '<img src="img/portfolio/cabin.png" class="img-responsive" alt="">' + newLineWithTabs(4) 
            + '</a>' + newLineWithTabs(3) + '</div>' + newLineWithTabs(2) + '</div>' + newLineWithTabs(0);
		}
		html += newLineWithTabs(1) + '</div>' + newLineWithTabs(0) +'</section>';
		console.log(html);

	}
	//$('portfolio-section').innerHTML = html;
}




function newLineWithTabs(n){
	var nl = '\n';
	for (var i = 0; i<n; i++){
		nl+='\t';
	}
	return nl;
}
console.log(this.files);


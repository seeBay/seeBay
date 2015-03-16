$(document).ready( 
	init()
);

function init(){
	$( ".datepicker" ).datepicker();
	FixtureParser.initialize();
}

// Default variables
var grid_size = 30;
var fill_color = 'black';
var current_mode = 'NO';

// Huebee Color Picker
// http://huebee.buzz/#events
var elem = $('#Picker')[0];
var hueb = new Huebee( elem, {
	"notation": "hex", 
	"saturations": 2,
});

// hoverMouse function
hoverMouse = function(func_color, func_mode) {
	if (func_mode == 'NO') {
		$('#grid-space>.row>.block').hover(
			function(){
				$(this).css('background-color', func_color)
			}, 
			function(){}
		);
	}
	else if (func_mode == 'YES') {
		$('#grid-space>.row>.block').hover(
			function() {
				$(this).removeClass('trail');
				$(this).css('background-color', func_color);
			}, function() {
				$(this).addClass('trail');
				$(this).css('background-color', '#fff');
			}
		);
	}
};

// resizeGrid function
resizeGrid = function(grid_size) {
	$('#grid-space').empty();
	for (i = 0; i < grid_size; i++) {
		$('#grid-space').append("<div class='row'></div>");
	}
	for (j = 0; j < grid_size; j++) {
		$('#grid-space>.row').append("<div class='block'></div>");
	}
	var size_percentage = 100/grid_size + '%';
	$('#grid-space>.row').css('flex-basis', size_percentage)
	$('#grid-space>.row>.block').css('flex-basis', size_percentage)
};

// Document Ready
$(document).ready(function() {
	resizeGrid(grid_size);
	hoverMouse(fill_color, current_mode);
});

// Resize button
$('button#resize').click(function(){
	$('button#trailing').removeClass('ON');
	$('button#trailing').text('Trailing: Currently Off');
	
	var grid_size_new = window.prompt('So, not satisfied with the size, huh? Tell me how big do you want it then?', 'Maximum 150, okay?');
	resizeGrid(grid_size_new);
	hoverMouse(fill_color, current_mode);
});

// Clear button
$('button#clear').click(function(){
	$('button#trailing').removeClass('ON');
	$('button#trailing').text('Trailing: A Different On');
	
	$('#grid-space>.row>.block').css('background-color', 'white')	
	hoverMouse(fill_color, current_mode);
});

// Color button
hueb.on( 'change', function(color) {
  fill_color = color;
	hoverMouse(fill_color, current_mode);
});

// Gradient color button
$('button#trailing').click(function() {
	$(this).toggleClass('ON')
	
	if($(this).hasClass('ON')){
		hoverMouse(fill_color, "YES");
		$(this).text('Trailing: Currently On');
	}
	else {
		hoverMouse(fill_color, "NO");
		$(this).text('Trailing: A Different On')
	}
});

// Random color button
$('button#random').click(function() {	
	$('#grid-space>.row>.block').hover(function(){
		$(this).css('background-color', ('#'+Math.floor(Math.random()*16777200).toString(16)))
	});
})
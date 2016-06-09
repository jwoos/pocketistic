'use strict';

$(document).ready(function() {
	$('.btn').click(function() {
		$.post('/authentication', '/home', function(data, status) {
			console.log(status);
			console.log(data);
		});
	});
});

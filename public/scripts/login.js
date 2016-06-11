'use strict';

$(document).ready(function() {
	$('.btn').click(function() {
		$.get('/auth/request', function(data, status) {
			window.location.href = data;
		});
	});

	if (location.path.indexOf('/login/end') > -1) {
		$.get('/auth/access', function(data, status) {
			window.location.href = '/';
		});
	}
});

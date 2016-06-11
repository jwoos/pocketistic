'use strict';

$(document).ready(function() {
	$('.btn').click(function() {
		$.get('/auth/request', function(data, status) {
			if (data.error) {
				console.log(data);
				console.log(status);
			} else {
				window.location.href = data;
			}
		});
	});

	if (location.pathname.indexOf('/login/end') > -1) {
		$.get('/auth/access', function(data, status) {
			if (data.error) {
				console.log(data);
				console.log(status);
			} else {
				window.location.href = '/';
			}
		});
	}
});

'use strict';

function print(content) {
	console.log('------------------------------\n');
	console.log(content);
	console.log('\n------------------------------');
}

$(document).ready(function() {
	$('.btn').click(function() {
		$.get('/auth/request')
			.done(function(data, textStatus, jqXHR) {
				window.location.href = data;
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			});
	});

	if (location.pathname.indexOf('/login/end') > -1) {
		$.get('/auth/access')
			.done(function(data, textStatus, jqXHR) {
				window.location.href = '/';
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log(data);
				console.log(status);
			});
	}
});

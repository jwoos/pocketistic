'use strict';

$(document).ready(function() {
	$.get('/data/retrieve').done(function(data, textStatus, jqXHR) {
		console.log(data);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${jqXHR.status}: ${errorThrown}`
		});
	});
});

'use strict';

$(document).ready(function() {
	let stats;

	$.get('/data/retrieve').done(function(data, textStatus, jqXHR) {
		stats = data;
	}).fail(function(jqXHR, textStatus, errorThrown) {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${jqXHR.status}: ${errorThrown}`
		});
	});

	$('#update').on('click', () => {
		$.get('/data/update').done(function(data, textStatus, jqXHR) {
			stats = data;
		}).fail(function(jqXHR, textStatus, errorThrown) {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${jqXHR.status}: ${errorThrown}`
			});
		});
	})
});

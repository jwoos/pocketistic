'use strict';

var pattern = Trianglify({
	height: $('body').height(),
	width: $('body').width(),
	cell_size: 60,
	variance: '1',
	x_colors: 'Spectral',
	y_colors: 'match_x',
});

$('body').css('background-image', 'url(' + pattern.png() + ')');

$('.skew-button').click(function() {
	swal({
		title: 'Redirecting',
		text: 'You will be redirected to Pocket to sign in',
		showConfirmButton: false,
		type: 'info'
	});

	setTimeout(function() {
		$.get('/auth/request')
			.done(function(data) {
				window.location.href = data;
			}).fail(function(jqXHR, textStatus, errorThrown) {
				swal({
					title: 'Oops',
					type: 'error',
					text: `${jqXHR.status}: ${errorThrown}`,
					allowEscapeKey: false
				}, function() {
					window.location.href = '/';
				});
			});
	}, 1500);
});

if (location.search.indexOf('?end=true') > -1) {
	$.get('/auth/access')
		.done(function() {
			window.location.href = '/';
		}).fail(function(jqXHR, textStatus, errorThrown) {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${jqXHR.status}: ${errorThrown}`,
				allowEscapeKey: false
			}, function() {
				window.location.href = '/';
			});
		});
}

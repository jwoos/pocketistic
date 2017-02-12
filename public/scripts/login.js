'use strict';

const body = document.querySelector('body');
const bodyBoundingClientRect = body.getBoundingClientRect();

var pattern = Trianglify({
	height: bodyBoundingClientRect.height,
	width: bodyBoundingClientRect.width,
	cell_size: 60,
	variance: '1',
	x_colors: 'Spectral',
	y_colors: 'match_x',
});

body.style.backgroundImage = 'url(' + pattern.png() + ')';

if (location.search.indexOf('?end=true') > -1) {
	axios.get('/auth/access')
		.then(function() {
			window.location.href = '/';
		}).catch(function(error) {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${error.response.status}: ${error.response.data}`,
				allowEscapeKey: false
			}, function() {
				window.location.href = '/';
			});
		});
} else {
	document.querySelector('.skew-button').addEventListener('click', function() {
		swal({
			title: 'Redirecting',
			text: 'You will be redirected to Pocket to sign in',
			showConfirmButton: false,
			type: 'info'
		});

		setTimeout(function() {
			axios.get('/auth/request')
				.then(function(response) {
					window.location.href = response.data;
				}).catch(function(error) {
					console.log(error);

					/*
					 *swal({
					 *  title: 'Oops',
					 *  type: 'error',
					 *  text: `${jqXHR.status}: ${errorThrown}`,
					 *  allowEscapeKey: false
					 *}, function() {
					 *  window.location.href = '/';
					 *});
					 */
				});
		}, 1500);
	});
}

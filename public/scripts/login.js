'use strict';

const body = document.querySelector('body');
const bodyBoundingClientRect = body.getBoundingClientRect();

const pattern = Trianglify({
	height: bodyBoundingClientRect.height,
	width: bodyBoundingClientRect.width,
	cell_size: 60,
	variance: '1',
	x_colors: 'Spectral',
	y_colors: 'match_x',
});

body.style.backgroundImage = 'url(' + pattern.png() + ')';

if (location.search.indexOf('?end=true') > -1) {
	axios.get('/api/auth/access')
		.then(() => {
			window.location.href = '/';
		}).catch((error) => {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${error.response.status}: ${error.response.data}`,
				allowEscapeKey: false
			}, () => {
				window.location.href = '/';
			});
		});
} else {
	document.querySelector('.skew-button').addEventListener('click', () => {
		swal({
			title: 'Redirecting',
			text: 'You will be redirected to Pocket to sign in',
			showConfirmButton: false,
			type: 'info'
		});

		setTimeout(() => {
			axios.get('/api/auth/request')
				.then((response) => {
					window.location.href = response.data;
				}).catch((error) => {
					console.log(error);

					swal({
						title: 'Oops',
						type: 'error',
						text: `${error.response.status}: ${error.response.data}`,
						allowEscapeKey: false
					}, () => {
						window.location.href = '/';
					});
				});
		}, 1500);
	});
}

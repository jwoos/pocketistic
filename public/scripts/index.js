'use strict';

$(document).ready(function() {
	var cookie = {};
	var cookieArr = document.cookie.split('; ');

	for (var i = 0; i < cookieArr.length; i++) {
		var temp = cookieArr.split('=');
		cookie[temp[0]] = temp[1];
	}

	if (cookie.token || ls.token) {
		var token = cookie.token || ls.token;
		var userName = cookie.userName || ls.userName;
		$.post('/auth/request', {token: token, userName: userName}, function(data, status) {
			console.log(status);
			console.log(data);
			window.location.href = data;
		});
	}

	$('.btn').click(function() {
		$.post('/auth/request', {}, function(data, status) {
			console.log(status);
			console.log(data);
			window.location.href = data;
		});
	});
});

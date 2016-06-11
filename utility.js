'use strict';

const utility = {
	print: (content) => {
		console.log('------------------------------\n');
		console.log(content);
		console.log('\n------------------------------');
	},
	sleep: (sleepDuration) => {
		let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {/* do nothing */}
	}
};

module.exports = utility;

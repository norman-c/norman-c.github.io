exports.myDateTime =
function () {
	var today = new Date();
	var time = today.toLocaleTimeString();
	return time;
};
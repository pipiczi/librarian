function formatDate(birthDate) {
	var date = new Date(parseInt(birthDate));
	return getYear(date) + "-" + getMonth(date) + "-" + getDay(date);
}

function getYear(date) {
	return date.getFullYear();
}
function getMonth(date) {
	var month = date.getMonth() + 1;
	return formatNumber(month);
}
function getDay(date) {
	var day = date.getDate();
	return formatNumber(day);
}

function formatNumber(number) {
	if(number < 10) {
		return "0" + number;
	}
	return number;
}
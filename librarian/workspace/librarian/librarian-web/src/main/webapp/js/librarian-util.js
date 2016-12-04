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

function saveAuthor(selectedAuthor, exists, ctrl) {
	var name = viewObjects.iName.val() ? viewObjects.iName.val() : selectedAuthor.name;
	var nationality = $('#tf-nationality > div > span').text() ? $('#tf-nationality > div > span').text() : selectedAuthor.nationality;
	var year = viewObjects.iYear.val() ? viewObjects.iYear.val() : selectedAuthor.birthDate.substring(0,4);
	var month = viewObjects.iMonth.val() ? formatNumber(viewObjects.iMonth.val()) : selectedAuthor.birthDate.substring(5,7);
	var day = viewObjects.iDay.val() ? formatNumber(viewObjects.iDay.val()) : selectedAuthor.birthDate.substring(8);
	
	var tempAuthor = {
		"authorID": selectedAuthor.authorID,
		"birthDate": year + "-" + month + "-" + day,
		"name": name,
		"nationality": nationality
	}
	
	$.ajax({
	    url: exists ? '/librarian-web/author/update' : '/librarian-web/author/insert',
	    type: 'POST',
	    data: JSON.stringify(tempAuthor),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: true,
	    complete: function(msg) {
	        if(msg.readyState === 4) {
	        	var toastText = "";
	        	if(msg.status === 200) {
	        		selectedAuthor.name = tempAuthor.name;
	        		selectedAuthor.nationality = tempAuthor.nationality;
	        		selectedAuthor.birthDate = tempAuthor.birthDate;
		        	
		    		ctrl.reload();
		    		
		    		toastText = exists ? tempAuthor.name + ' updated!' : tempAuthor.name + ' created!';
	        	} else {
		    		toastText = exists ? tempAuthor.name + ' update failed!' : tempAuthor.name + ' creation failed!';
	        	}
	        	viewObjects.readyToast.MaterialSnackbar.showSnackbar({message: toastText});
	        }   
	     }  
	});
	
	viewObjects.closeDialog();
}
var viewObjects = new viewObjects();

function viewObjects() {
	this.dialog;
	this.dialogTitle;
	this.readyToast;
	this.saveBtn;
	
	// BOOKS
	this.booksTableBody;

	this.authorsTableBody;
	this.authorsTableTitle;
	
	this.tfName;
	this.iName;
	this.lName;
	
	this.tfNationality;
	this.iNationality;
	this.lNationality;
	
	this.tfYear;
	this.iYear;
	this.lYear;
	
	this.tfMonth;
	this.iMonth;
	this.lMonth;
	
	this.tfDay;
	this.iDay;
	this.lDay;
	
	// AUTHORS
	this.fullAuthorsTableBody;
	
	this.closeDialog = closeDialog;
	
	function closeDialog() {
		this.iName.val('');
		this.tfName.removeClass('is-dirty').removeClass('is-invalid');
		$('#tf-nationality > div > span').text('');
		this.tfNationality.removeClass('is-dirty').removeClass('is-invalid');
		this.iYear.val('');
		this.tfYear.removeClass('is-dirty').removeClass('is-invalid');
		this.iMonth.val('');
		this.tfMonth.removeClass('is-dirty').removeClass('is-invalid');
		this.iDay.val('');
		this.tfDay.removeClass('is-dirty').removeClass('is-invalid');
		
		viewObjects.dialog.close();
	}
}

$(document).ready(function(){
	$('#about').load('views/about.html', function() {
		setupViewObjects();
	});
	$('#authors').load('views/authors.html', function() {
		setupAuthorsViewObjects();
	});
	$('#books').load('views/books.html', function() {
		setupBooksViewObjects();
	});
});


function setupViewObjects() {
	viewObjects.dialog = document.querySelector('dialog');
	viewObjects.dialogTitle = $('#dialog-title');
	viewObjects.readyToast = document.querySelector('#ready-toast');
	viewObjects.saveBtn = $('#saveBtn');
}

function setupBooksViewObjects() {
	viewObjects.booksTableBody = $('#books-table > tbody');
	
	viewObjects.authorsTableBody = $('#authors-table > tbody');
	viewObjects.authorsTableTitle = $('#authors-table-title');
	
	viewObjects.tfName = $('#tf-name');
	viewObjects.iName = $('#i-name');
	viewObjects.lName = $('#l-name');
	
	viewObjects.tfNationality = $('#tf-nationality');
	viewObjects.iNationality = $('#i-nationality');
	viewObjects.lNationality = $('#l-nationality');
	
	viewObjects.tfYear = $('#tf-year');
	viewObjects.iYear = $('#i-year');
	viewObjects.lYear = $('#l-year');
	
	viewObjects.tfMonth = $('#tf-month');
	viewObjects.iMonth = $('#i-month');
	viewObjects.lMonth = $('#l-month');
	
	viewObjects.tfDay = $('#tf-day');
	viewObjects.iDay = $('#i-day');
	viewObjects.lDay = $('#l-day');
}

function setupAuthorsViewObjects() {
	viewObjects.fullAuthorsTableBody = $('#full-authors-table > tbody');
}
var authorCtrl = new AuthorController;

function AuthorController() {
	this.authors = null;
	this.selectedAuthor = null;

	this.buildAuthorRows = buildAuthorRows;
	this.editAuthor = editAuthor;
	this.createAuthor = createAuthor;
	this.reload = loadAuthors;
	this.saveFunction;
	
	function buildAuthorRows(authors) {
		var rows = "";
		$.each(authors, function(index, author) {
			rows +=
				"<tr>" +
					"<td class='mdl-data-table__cell--non-numeric'>" + author.name + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" + author.nationality + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" + author.birthDate + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" +
						"<label id='edit-" + author.authorID + "' class='mdl-button mdl-js-button mdl-button--icon' for='fixed-header-drawer-exp' onclick='authorCtrl.editAuthor("+ author.authorID + ")'>" +
							"<i class='material-icons'>edit</i>" +
						"</label>" +
					"</td>"+
				"</tr>";
		});
		
		return rows;
	}

	function editAuthor(id) {
		viewObjects.dialogTitle.text('Edit author');
		this.selectedAuthor = findAuthorById(id);
		this.saveFunction = function() {
			saveAuthor(this.selectedAuthor, true, this);
		};
		
		viewObjects.lName.text(this.selectedAuthor.name);
		viewObjects.lNationality.text(this.selectedAuthor.nationality);
		viewObjects.lYear.text(this.selectedAuthor.birthDate.substring(0,4));
		viewObjects.lMonth.text(this.selectedAuthor.birthDate.substring(5,7));
		viewObjects.lDay.text(this.selectedAuthor.birthDate.substring(8));
		
		viewObjects.dialog.showModal();
	}
	
	function createAuthor() {
		viewObjects.dialogTitle.text('Create author');
		this.selectedAuthor = {
				"birthDate": "",
				"name": "",
				"nationality": ""
		};
		this.saveFunction = function() {
			saveAuthor(this.selectedAuthor, false, this);
		};
		
		viewObjects.lName.text('Name');
		viewObjects.lNationality.text('Nationality');
		viewObjects.lYear.text('Year');
		viewObjects.lMonth.text('Month');
		viewObjects.lDay.text('Day');
		
		viewObjects.dialog.showModal();
	}

	function findAuthorById(id) {
		var foundAuthor = undefined;
		$.each(authorCtrl.authors, function(index, author) {
			if (author.authorID === id) {
				foundAuthor = author;
			}
		});
		return foundAuthor;
	}
	
	function loadAuthors() {
		$.get('/librarian-web/authors', function(result) {
			authorCtrl.authors = result;
			
			$.each(authorCtrl.authors, function(index, author) {
				author.birthDate = formatDate(author.birthDate);
			});
			viewObjects.fullAuthorsTableBody.html(authorCtrl.buildAuthorRows(authorCtrl.authors));
		});
	}
}

$(document).ready(function () {
	$('#authorsTab').click(function() {
		viewObjects.saveBtn.unbind();
		viewObjects.saveBtn.click(function() {
			authorCtrl.saveFunction();
		});
		authorCtrl.reload();
	});
});

var bookCtrl = new BookController();

function BookController() {
	this.books = null;
	this.authors = null;
	this.selectedBook = null;
	this.selectedAuthor = null;
	
	this.buildBookRows = buildBookRows;
	this.selectBook = selectBook;
	this.editAuthor = editAuthor;
	this.saveAuthor = saveAuthor;
	
	//
	// BOOKS
	//
	function buildBookRows(items) {
		var rows = "";
		$.each(items, function(index, item) {
			var genres = buildGenres(item.genres);
			
			rows +=
				"<tr onclick='bookCtrl.selectBook(" + item.bookId + ")' id='book-row-" + item.bookId + "'>" +
					"<td class='mdl-data-table__cell--non-numeric'>" + item.title + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" + genres + "</td>"+
				"</tr>";
		});
		
		return rows;
	}
	
	function buildGenres(genres) {
		var td = "";
		
		$.each(genres, function(index, genre) {
			if (index > 0) 
				td += "</br>";
			td += genre;
		});
		
		return td;
	}
	
	function selectBook(bookId) {
		$('#books-table tr').removeClass('selected-row');
		$('#books-table #book-row-' + bookId).addClass('selected-row');

		this.selectedBook = findBookById(bookId);

		viewObjects.authorsTableTitle.text('Authors of ' + this.selectedBook.title);
		this.authors = this.selectedBook.authors;
		var rows = buildAuthorRows(this.authors);
		viewObjects.authorsTableBody.html(rows);
	}
	
	function findBookById(id) {
		var foundBook = undefined;
		$.each(bookCtrl.books, function(index, book) {
			if (book.bookId === id) {
				foundBook = book;
			}
		});
		return foundBook;
	}
	
	//
	// AUTHORS
	//
	function buildAuthorRows(authors) {
		var rows = "";
		$.each(authors, function(index, author) {
			rows +=
				"<tr>" +
					"<td class='mdl-data-table__cell--non-numeric'>" + author.name + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" + author.nationality + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" + author.birthDate + "</td>"+
					"<td class='mdl-data-table__cell--non-numeric'>" +
						"<label id='edit-" + author.authorID + "' class='mdl-button mdl-js-button mdl-button--icon' for='fixed-header-drawer-exp' onclick='bookCtrl.editAuthor("+ author.authorID + ")'>" +
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
		
		viewObjects.lName.text(this.selectedAuthor.name);
		viewObjects.lNationality.text(this.selectedAuthor.nationality);
		viewObjects.lYear.text(this.selectedAuthor.birthDate.substring(0,4));
		viewObjects.lMonth.text(this.selectedAuthor.birthDate.substring(5,7));
		viewObjects.lDay.text(this.selectedAuthor.birthDate.substring(8));
		
		viewObjects.dialog.showModal();
	}

	function findAuthorById(id) {
		var foundAuthor = undefined;
		$.each(bookCtrl.authors, function(index, author) {
			if (author.authorID === id) {
				foundAuthor = author;
			}
		});
		return foundAuthor;
	}

	function saveAuthor() {
		var name = viewObjects.iName.val() ? viewObjects.iName.val() : this.selectedAuthor.name;
		var nationality = $('#tf-nationality > div > span').text() ? $('#tf-nationality > div > span').text() : this.selectedAuthor.nationality;
		var year = viewObjects.iYear.val() ? viewObjects.iYear.val() : this.selectedAuthor.birthDate.substring(0,4);
		var month = viewObjects.iMonth.val() ? formatNumber(viewObjects.iMonth.val()) : this.selectedAuthor.birthDate.substring(5,7);
		var day = viewObjects.iDay.val() ? formatNumber(viewObjects.iDay.val()) : this.selectedAuthor.birthDate.substring(8);
		
		var editingAuthor = this.selectedAuthor;
		var tempAuthor = {
			"authorID": editingAuthor.authorID,
			"birthDate": year + "-" + month + "-" + day,
			"name": name,
			"nationality": nationality
		}
		
		$.ajax({
		    url: '/librarian-web/author/update',
		    type: 'POST',
		    data: JSON.stringify(tempAuthor),
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    async: true,
		    complete: function(msg) {
		        if(msg.readyState === 4) {
		        	if(msg.status === 200) {
			        	editingAuthor.name = tempAuthor.name;
			        	editingAuthor.nationality = tempAuthor.nationality;
			        	editingAuthor.birthDate = tempAuthor.birthDate;
			        	
			        	selectBook(bookCtrl.selectedBook.bookId);
			        	
			  		    viewObjects.readyToast.MaterialSnackbar.showSnackbar({message: tempAuthor.name + ' updated!'});
		        	} else {
		        		viewObjects.readyToast.MaterialSnackbar.showSnackbar({message: tempAuthor.name + ' update failed!'});
		        	}
		        }   
		     }  
		});
		
		viewObjects.closeDialog();
	}
}

$(document).ready(function () {
	$('#booksTab').click(function() {
		$.get('/librarian-web/books', function(result) {
			viewObjects.saveBtn.unbind();
			viewObjects.saveBtn.click(function() {
				bookCtrl.saveAuthor();
			});
			
			bookCtrl.books = result;
			viewObjects.booksTableBody.html(bookCtrl.buildBookRows(bookCtrl.books));
			
			$.each(bookCtrl.books, function(index, book) {
				$.each(book.authors, function(index, author) {
					author.birthDate = formatDate(author.birthDate);
				});
			});
			
			bookCtrl.selectBook(bookCtrl.books[0].bookId);
		});
	});
});

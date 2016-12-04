var bookCtrl = new BookController();

function BookController() {
	this.books = null;
	this.authors = null;
	this.selectedBook = null;
	this.selectedAuthor = null;
	
	this.buildBookRows = buildBookRows;
	this.selectBook = selectBook;
	this.editAuthor = editAuthor;
	this.reload = loadBooks;
	this.saveFunction;
	
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

	function findAuthorById(id) {
		var foundAuthor = undefined;
		$.each(bookCtrl.authors, function(index, author) {
			if (author.authorID === id) {
				foundAuthor = author;
			}
		});
		return foundAuthor;
	}
	
	function loadBooks() {
		$.get('/librarian-web/books', function(result) {
			bookCtrl.books = result;
			viewObjects.booksTableBody.html(bookCtrl.buildBookRows(bookCtrl.books));
			
			$.each(bookCtrl.books, function(index, book) {
				$.each(book.authors, function(index, author) {
					author.birthDate = formatDate(author.birthDate);
				});
			});
			
			bookCtrl.selectBook(bookCtrl.books[0].bookId);
		});
	}
}

$(document).ready(function () {
	$('#booksTab').click(function() {
		viewObjects.saveBtn.unbind();
		viewObjects.saveBtn.click(function() {
			bookCtrl.saveFunction();
		});
		bookCtrl.reload();
	});
});

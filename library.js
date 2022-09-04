// Array to store the books
let myLibrary = [];

// Book object (REPLACED W CLASS BELOW)
/*function Book(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
}*/

class Book {
  constructor(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
  }

  changeReadStatus() {
    this.readOrNot === "read" ? this.readOrNot = "not read yet" : this.readOrNot = "read";
    displayBooks();
  }

}

// Function to change "read" status for any book (MOVED INTO CLASS ABOVE)
/*Book.prototype.changeReadStatus = function() {
  this.readOrNot === "read" ? this.readOrNot = "not read yet" : this.readOrNot = "read";
  displayBooks();
}*/


// Using Object.create to return a new object with the Book prototype (REMOVED)
/*function NewBook() { }
NewBook.prototype = Object.create(Book.prototype);*/

// Adding books to library using form input and button
// Creating new book object with properties pulled from user input values
// preventDefault() to stop form from submitting
// Resetting form
function addBookToLibrary(ev) {
  ev.preventDefault();
  let newBook = new Book();
  newBook.title = document.getElementById("title").value;
  newBook.author = document.getElementById("author").value;
  newBook.pages = document.getElementById("pages").value;
  newBook.readOrNot = document.querySelector("input[name=read]:checked").value;
  myLibrary.push(newBook);
  document.querySelector("form").reset();
}

document.querySelector(".add").addEventListener("click", addBookToLibrary);

// Want to be able to select container so that we can clear "empty library" text
let box = document.getElementById("container");

// Displaying books in the myLibrary array
function displayBooks () {
  box.textContent = "";

  // Iterating through the array of book objects (items)
  myLibrary.forEach(function (item, index) { 
    
    // Making a div for each book object, setting class as "book" for styling, adding it to the container
    const div = document.createElement("div");
    div.setAttribute("class", "book");
    box.appendChild(div);

    // Making divs for titles and authors
    // Setting classes based on string length for titles and authors so that we can shrink text if needed
    // Setting content displayed in bookTitle and bookAuthor divs to be equal to the title and author of each book object (item)
    const bookTitle = document.createElement("div");
    if (item.title.length > 20) {
      bookTitle.setAttribute("class", "bookTitleShrink");
    } else {
    bookTitle.setAttribute("class", "bookTitle");
    }
    bookTitle.textContent = item.title;
    div.appendChild(bookTitle);

    const bookAuthor = document.createElement("div");
    if (item.title.length > 20) {
      bookAuthor.setAttribute("class", "bookAuthorShrink");
    } else {
    bookAuthor.setAttribute("class", "bookAuthor");
    }
    bookAuthor.textContent = item.author;
    div.appendChild(bookAuthor);

    // Div to display page number
    const pageNumber = document.createElement("div");
    pageNumber.setAttribute("class", "pageNumber");
    pageNumber.textContent = item.pages + " pages";
    div.appendChild(pageNumber);

    // Button that will have different class and text depending on whether book object (item) is read or no
    const statusToggle = document.createElement("button");
    if (item.readOrNot === "read") {
      statusToggle.textContent = "Read ✓";
      statusToggle.setAttribute("class", "toggleRead");
    } else {
      statusToggle.textContent = "Not read";
      statusToggle.setAttribute("class", "toggleNotRead");
    }
    div.appendChild(statusToggle);
    
    // Need to use bind here otherwise would be global "this":
    statusToggle.addEventListener("click", item.changeReadStatus.bind(item));

    // Adding button to remove book
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove");
    removeBtn.textContent = "Remove";
    div.appendChild(removeBtn);

    // Remove book object both visually and from array when "remove" is clicked
    div.setAttribute("data-index-number", index);
    removeBtn.addEventListener("click", function() {
      box.removeChild(div);
      myLibrary.splice(Number(div.dataset.indexNumber), 1);
    });
  });
}

document.querySelector(".btn").addEventListener("click", displayBooks);

//Open form when we click the "Add a book" button
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

document.querySelector(".button").addEventListener("click", openForm);

// Close form when we click the "cancel" button
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.querySelector(".cancel").addEventListener("click", closeForm);


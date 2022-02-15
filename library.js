let myLibrary = [];

function Book(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

Book.prototype.changeReadStatus = function() {
  if (this.readOrNot === "read") {
    this.readOrNot = "not read yet";
  } else {
    this.readOrNot = "read";
  }
  displayBooks();
}

function NewBook() { }

NewBook.prototype = Object.create(Book.prototype);

function addBookToLibrary(ev) {
  ev.preventDefault();
  let newBook = new NewBook();
  newBook.title = document.getElementById("title").value;
  newBook.author = document.getElementById("author").value;
  newBook.pages = document.getElementById("pages").value;
  newBook.readOrNot = document.querySelector("input[name=read]:checked").value;
  myLibrary.push(newBook);
  document.querySelector("form").reset();
}

let box = document.getElementById("container");


function displayBooks () {
  box.textContent = "";
  myLibrary.forEach(function (item, index) { 
    const div = document.createElement("div");
    div.setAttribute("class", "book");
    box.appendChild(div);

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

    const pageNumber = document.createElement("div");
    pageNumber.setAttribute("class", "pageNumber");
    pageNumber.textContent = item.pages + " pages";
    div.appendChild(pageNumber);

    const statusToggle = document.createElement("button");
    if (item.readOrNot === "read") {
      statusToggle.textContent = "Read ✓";
      statusToggle.setAttribute("class", "toggleRead");
    } else {
      statusToggle.textContent = "Not read";
      statusToggle.setAttribute("class", "toggleNotRead");
    }
    div.appendChild(statusToggle);
    statusToggle.addEventListener("click", item.changeReadStatus.bind(item));

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove");
    removeBtn.textContent = "Remove";
    div.appendChild(removeBtn);

    div.setAttribute("data-index-number", index);
    removeBtn.addEventListener("click", function() {
      box.removeChild(div);
      myLibrary.splice(Number(div.dataset.indexNumber), 1);
    });
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

document.querySelector(".button").addEventListener("click", openForm);

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.querySelector(".cancel").addEventListener("click", closeForm);

document.querySelector(".add").addEventListener("click", addBookToLibrary);

document.querySelector(".btn").addEventListener("click", displayBooks);
let myLibrary = [{
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    pages: 350,
    read: "yes"
}, {
    title: "And then there were none",
    author: "Agatha Christie",
    pages: 300,
    read: "yes"
}, {
    title: "Sahara",
    author: "Clive Cussler",
    pages: 450,
    read: "no"
}];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let newBook;
let bookTitle;
let bookAuthor;
let bookPages;
let bookRead;
const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add-book");

addBook.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    let title = window.prompt("Enter book title: ");
    let author = window.prompt("Enter book author: ");
    let pages = window.prompt("Enter number of pages: ");
    let read = window.prompt("Enter read status: ");
    myLibrary.push(new Book(title, author, pages, read));

    newBook = document.createElement("div");
    newBook.classList.add("book");
    bookTitle = document.createElement("h3");
    bookAuthor = document.createElement("p");
    bookPages = document.createElement("p");
    bookRead = document.createElement("p");

    bookTitle.textContent = title;
    bookAuthor.textContent = "by " + author;
    bookPages.textContent = pages + " pages";
    bookRead.textContent = "Read: " + read;

    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(bookRead);
    shelf.appendChild(newBook);
}

function displayBooks() {
    myLibrary.forEach(book => {

        newBook = document.createElement("div");
        newBook.classList.add("book");
        bookTitle = document.createElement("h3");
        bookAuthor = document.createElement("p");
        bookPages = document.createElement("p");
        bookRead = document.createElement("p");

        bookTitle.textContent = book.title;
        bookAuthor.textContent = "by " + book.author;
        bookPages.textContent = book.pages + " pages";
        bookRead.textContent = "Read: " + book.read;

        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookPages);
        newBook.appendChild(bookRead);
        shelf.appendChild(newBook);
    });
}

displayBooks() ;
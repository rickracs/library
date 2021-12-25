let myLibrary = [];

const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add-book");

//Add 3 books automatically, then display them and listen for clicks
myLibrary.push(new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 350, "read"));
displayBooks(myLibrary[myLibrary.length - 1]);
myLibrary.push(new Book("And then there were none", "Agatha Christie", 300, "read"));
displayBooks(myLibrary[myLibrary.length - 1]);
myLibrary.push(new Book("Sahara", "Clive Cussler", 450, "not read yet"));
displayBooks(myLibrary[myLibrary.length - 1]);




//book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//change read status, called on click. HTML Text content changed in separate function
Book.prototype.changeStatus = function () {
    if (this.read == "read") this.read = "not read yet"
    else this.read = "read"
}

//adding a book, window prompt is placeholder, will add form
function addBookToLibrary() {
    let title = window.prompt("Enter book title: ");
    let author = window.prompt("Enter book author: ");
    let pages = window.prompt("Enter number of pages: ");
    let read = window.prompt("Enter read status (read/not read yet): ");
    myLibrary.push(new Book(title, author, pages, read));
    displayBooks(myLibrary[myLibrary.length - 1]);
}

function displayBooks(book) {
    let newBook = document.createElement("div");
    newBook.classList.add("book");
    let bookTitle = document.createElement("h3");
    let bookAuthor = document.createElement("p");
    let bookPages = document.createElement("p");
    let bookRead = document.createElement("button");
    let removeButton = document.createElement("button");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = "by " + book.author;
    bookPages.textContent = book.pages + " pages";
    bookRead.textContent = book.read;
    bookRead.setAttribute("data-id", (myLibrary.length - 1));
    bookRead.classList.add("read-status");
    if (book.read == "not read yet") {
        bookRead.classList.add("not-read-yet");
    }
    removeButton.textContent = "X";
    removeButton.setAttribute("data-id", (myLibrary.length - 1));
    removeButton.classList.add("remove-book");

    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(bookRead);
    newBook.appendChild(removeButton);
    shelf.appendChild(newBook);
    listenForClick();
}


//reset data ID of the books after removing one
function resetShelf(index) {
    shelf.removeChild(shelf.children[index]);
    let readStatus = document.querySelectorAll(".read-status");
    readStatus.forEach((button, index) => {
        button.setAttribute("data-id", index);
    });
    let removeBook = document.querySelectorAll(".remove-book");
    removeBook.forEach((button, index) => {
        button.setAttribute("data-id", index);
    });

}


//changing the status of the book, first in the object using a prototype function, then in the HTML
function changeReadStatus(e) {
    myLibrary[e.target.getAttribute("data-id")].changeStatus();
    e.target.textContent = myLibrary[e.target.getAttribute("data-id")].read;
    if (myLibrary[e.target.getAttribute("data-id")].read == "not read yet")
        e.target.classList.add("not-read-yet")
    else e.target.classList.remove("not-read-yet");
}

const buttonsWithId = document.querySelectorAll("[data-id]");

//remove a book from the array using splice
function removeBookFromLibrary(e) {
    myLibrary.splice(e.target.getAttribute("data-id"), 1);
    resetShelf(e.target.getAttribute("data-id"));
}

//function to listen for clicks on books, need to call it after adding a book
function listenForClick() {
    let removeBook = document.querySelectorAll(".remove-book");
    removeBook.forEach(book => {
        book.addEventListener("click", removeBookFromLibrary);
    })
    let readStatus = document.querySelectorAll(".read-status");
    readStatus.forEach(book => {
        book.addEventListener("click", changeReadStatus);
    })
}

addBook.addEventListener("click", addBookToLibrary);

// Q - is this a good way to initialize variables? Can I do this inside the functions?
let myLibrary = [];

const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add-book");

//Add 3 books automatically, then display them and listen for clicks
myLibrary.push(new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 350, "read"));
myLibrary.push(new Book("And then there were none", "Agatha Christie", 300, "read"));
myLibrary.push(new Book("Sahara", "Clive Cussler", 450, "not read yet"));

displayBooks();


//book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//change read status, called on click. HTML Text content changed in separate function
Book.prototype.changeStatus = function () {
    if (this.read == "read") {
        this.read = "not read yet"
    }
    else {
        this.read = "read"
    }
}

//adding a book, window prompt is placeholder, will add form
function addBookToLibrary() {
    let title = window.prompt("Enter book title: ");
    let author = window.prompt("Enter book author: ");
    let pages = window.prompt("Enter number of pages: ");
    let read = window.prompt("Enter read status (read/not read yet): ");
    myLibrary.push(new Book(title, author, pages, read));
    displayBooks();
}


//clear the html when doing changes to books, not sure if this is the most efficient way
//Q - maybe there is a way to show only the last book added?
function resetShelf() {
    while (shelf.firstChild) {
        shelf.removeChild(shelf.lastChild);
    }
}


//Q - clearing the HTML and dispalying books, is there a way to skip already added books? maybe use something else instead of splice when removing?
function displayBooks() {
    resetShelf();

    myLibrary.forEach((book, index) => {

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
        bookRead.setAttribute("data-id", index);
        bookRead.classList.add("read-status")
        removeButton.textContent = "X";
        removeButton.setAttribute("data-id", index);
        removeButton.classList.add("remove-book");

        newBook.appendChild(bookTitle);
        newBook.appendChild(bookAuthor);
        newBook.appendChild(bookPages);
        newBook.appendChild(bookRead);
        newBook.appendChild(removeButton);
        shelf.appendChild(newBook);
    });
    listenForClick();

}

//changing the status of the book, first in the object using a prototype function, then in the HTML
function changeReadStatus(e) {
    myLibrary[e.target.getAttribute("data-id")].changeStatus();
    e.target.textContent = myLibrary[e.target.getAttribute("data-id")].read;
}

//remove a book from the array using splice
function removeBookFromLibrary(e) {
    myLibrary.splice(e.target.getAttribute("data-id"), 1);
    displayBooks();
}

//function to listen for clicks on books, doesn't seem to work without function
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






/////EXPERIMENT, NOT NEEDED NOW
/*
    newBook = document.createElement("div");
    newBook.classList.add("book");
    bookTitle = document.createElement("h3");
    bookAuthor = document.createElement("p");
    bookPages = document.createElement("p");
    bookRead = document.createElement("button");
    removeButton = document.createElement("button");

    bookTitle.textContent = title;
    bookAuthor.textContent = "by " + author;
    bookPages.textContent = pages + " pages";
    bookRead.textContent = read;
    bookRead.setAttribute("data-id", (myLibrary.length - 1));
    bookRead.classList.add("read-status")
    removeButton.textContent = "X";
    removeButton.setAttribute("data-id", (myLibrary.length - 1));
    removeButton.classList.add("remove-book");

    newBook.appendChild(bookTitle);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(bookRead);
    newBook.appendChild(removeButton);
    shelf.appendChild(newBook);

    listenForClick();*/
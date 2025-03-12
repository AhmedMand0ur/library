
const modal = document.getElementById("popupForm");
const openFormBtn = document.getElementById("openFormBtn");
const closeBtn = document.querySelector(".close-btn");
const bookForm = document.getElementById("bookForm");
const container = document.querySelector(".container");

const myLibrary = [];


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = function () {
        return `Title: ${this.title}\nAuthor: ${this.author}\nNo. of pages: ${this.pages}\nRead: ${this.read ? "Yes" : "No"}`;
    }

    toggleRead = function () {
        if (this.read === true) {
            this.read = false;
        }
        else {
            this.read = true;
        }
        return;
    }
}

/* Factory Function ---------------------------------------
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `Title: ${this.title}\nAuthor: ${this.author}\nNo. of pages: ${this.pages}\nRead: ${this.read ? "Yes" : "No"}`;
};

Book.prototype.toggleRead = function () {
    if (this.read === true) {
        this.read = false;
    }
    else {
        this.read = true;
    }
    return;
}

*/

function displayBooks() {
    container.innerHTML = ""; // Clear previous content

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const paraTitle = document.createElement("p");
        paraTitle.textContent = "Title: " + book.title;

        const paraAuthor = document.createElement("p");
        paraAuthor.textContent = "Author: " + book.author;

        const paraPages = document.createElement("p");
        paraPages.textContent = "No. of Pages: " + book.pages;

        const paraRead = document.createElement("p");
        paraRead.textContent = "Read: " + (book.read ? 'Yes' : 'No');
        paraRead.classList.add("read-toggle");

        const bookIcon = document.createElement('div');
        bookIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>bookmark</title><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" /></svg>';
        bookIcon.classList.add("book-icon");

        const deleteBtn = document.createElement('button');
        const deleteIcon = document.createElement('div');

        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>'
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.classList.add('delete-btn');

        card.appendChild(bookIcon);

        card.appendChild(paraTitle);
        card.appendChild(paraAuthor);
        card.appendChild(paraPages);
        card.appendChild(paraRead);
        card.appendChild(deleteBtn);

        container.appendChild(card);
    });
}

function addBookToLibrary(event) {
    event.preventDefault(); // Prevent form submission refresh

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();

    bookForm.reset(); // Reset form fields
    modal.style.display = "none"; // Close the popup
}




document.getElementById('author').addEventListener('input', function () {

    if (this.validity.patternMismatch) {
        this.setCustomValidity('Author name must contain characters only');
    } else {
        this.setCustomValidity('');
    }
    this.reportValidity();
});



// Open the popup
openFormBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close the popup
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

container.addEventListener('click', function (event) {

    // Toggle Read Status when clicking the "Read" paragraph
    if (event.target.classList.contains('read-toggle')) {
        const bookCard = event.target.closest('.book-card'); // Get the closest book card
        const index = Array.from(container.children).indexOf(bookCard); // Find its index
        myLibrary[index].toggleRead(); // Toggle read status
        displayBooks(); // Re-render to update UI
    }

    // Toggle Bookmark Icon Color
    if (event.target.closest('.book-icon')) { // Ensure clicking inside book-icon div
        const svg = event.target.closest('.book-icon').querySelector("svg"); // Get the actual SVG
        const currentColor = svg.getAttribute("fill");
        svg.setAttribute("fill", currentColor === "black" ? "rgba(0, 255, 0, 0.5)" : "black");
    }

    // Delete Book
    if (event.target.closest('.delete-btn')) { // Handle delete button click
        const bookCard = event.target.closest('.book-card'); // Find the closest book card
        const index = Array.from(container.children).indexOf(bookCard); // Get its index
        myLibrary.splice(index, 1); // Remove from library
        displayBooks(); // Re-render
    }
});



/*
// Close when clicking outside the modal
window.addEventListener("click", (event) => {
    if (!modal.contains(event.target) && modal.style.display === "flex") {
        modal.style.display = "none";
    }
});
*/

// Handle form submission
bookForm.addEventListener("submit", addBookToLibrary);


myLibrary.push(new Book('The Dark Knight', 'Christopher Nolan', 200, true));
myLibrary.push(new Book('Kingsman', 'Guy Ritche', 190, true));
myLibrary.push(new Book('Gun & Two Barrels', 'Guy Ritche', 88, false));
myLibrary.push(new Book('The Loop', 'Jonathon Valveno', 345, false));
myLibrary.push(new Book('1923', 'Levi Brown', 176, true));
myLibrary.push(new Book('The Chess Game', 'Kasparov', 210, false));
myLibrary.push(new Book('Al-Bedaya w Al-Nihaya', 'Ibn Kathir', 1640, false));
myLibrary.push(new Book('Where is My Dog', 'Stephan Roch', 40, false));



document.addEventListener("DOMContentLoaded", function () {
    displayBooks();
});

displayBooks();

// 'Add Book' button
const showBtn = document.getElementById("show-dialog");
// The dialog for adding books
const dialog = document.getElementById("dialog");
// The close button for the dialog
const jsCloseBtn = dialog.querySelector("#js-close");
// The form for adding books
const bookForm = document.getElementById("bookForm");
// Button for changing the read status of a book
const readBtn = document.querySelector(".read-btn");

// Event listener for showing the dialog
showBtn.addEventListener("click", () => {
  dialog.showModal();
});
  
// Event listener for closing the dialog
jsCloseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});

// Event listener so when the user clicks outside the dialog, it closes
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// An event listener for the Delete button
document.getElementById('book-list').addEventListener('click', (event) => {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('delete-btn')) {
      const bookIndex = event.target.getAttribute('data-index');
      deleteBook(bookIndex);
  }
});


// Event listener for the form submission button
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const bookData = {};
    formData.forEach((value, key) => {
      bookData[key] = value;
    });
    addBookToLibrary(bookData.title, bookData.author, bookData.pages, bookData.read);

    dialog.close();
})  

// Array to store book objects
const myLibrary = [];


// Function to create a new book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add a book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to loop through the library array and display each book
function displayBooks() {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        let bookElement = document.createElement('div');
        bookElement.classList.add('project-div');
        bookElement.innerHTML = `
          <h2>${book.title}</h2>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
         <p>Read:  <button class="read-btn" data-index="${index}">${book.read ? 'Yes' : 'No'}</button></p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        bookList.appendChild(bookElement);
    })
}
// Function to delete a book from the library array and update the display
function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Add event listener to the read button
document.getElementById('book-list').addEventListener('click', (event) => {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('read-btn')) {
    let bookIndex = event.target.getAttribute('data-index');
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    displayBooks();
  }
});

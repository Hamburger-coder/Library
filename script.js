const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector("#js-close");
const bookForm = document.getElementById("bookForm");

showBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  
jsCloseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

document.getElementById('book-list').addEventListener('click', (event) => {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('delete-btn')) {
      const bookIndex = event.target.getAttribute('data-index');
      console.log(bookIndex);
      deleteBook(bookIndex);
  }
});



bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const bookData = {};
    formData.forEach((value, key) => {
      bookData[key] = value;
    });
    addBookToLibrary(bookData.title, bookData.author, bookData.pages, bookData.read);
    console.log(bookData);
    console.log(bookData.title);

    dialog.close();
})  

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
    // for (let book of myLibrary) {
    //     console.log(book.author);
    // }
    // 
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        let bookElement = document.createElement('div');
        bookElement.classList.add('project-div');
        bookElement.innerHTML = `
          <h2>${book.title}</h2>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Read: ${book.read ? 'Yes' : 'No'}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        console.log(bookElement);
        bookList.appendChild(bookElement);
    })
}
function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}
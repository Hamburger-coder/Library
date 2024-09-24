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


bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const bookData = {};
    formData.forEach((value, key) => {
      bookData[key] = value;
    });
    console.log(bookData);

    dialog.close();
})  

const myLibrary = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 320,
    read: true,
},
{
    title: 'The Lord of the Rings',
    author: 'Joel Mast',
    pages: 1200,
    read: false,
}];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
    // for (let book of myLibrary) {
    //     console.log(book.author);
    // }
    // bookList.innerHTML = '';
    for (let book of myLibrary) {
        let bookList = document.getElementById('book-list');
        let bookElement = document.createElement('div');
        bookElement.classList.add('project-div');
        bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="delete-btn">Delete</button>
        `;
        console.log(bookElement);
        bookList.appendChild(bookElement);
    }
}


displayBooks();
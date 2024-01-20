/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
const newTitle = document.getElementById('inputTitle');
const newAuthor = document.getElementById('inputAuthor');
const addButton = document.getElementById('addBtn');

let activeLink;
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content');
  sections.forEach((section) => {
    section.classList.remove('visible');
  });

  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('visible');
  }
  if (activeLink) {
    activeLink.classList.remove('active');
  }

  const clickedLink = document.querySelector(`nav a[href="#"][onclick*="${sectionId}"]`);
  if (clickedLink) {
    clickedLink.classList.add('active');
    activeLink = clickedLink;
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.updateLocalData();
    this.displayBooks();
  }

  removeBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
    this.updateLocalData();
    this.displayBooks();
  }

  updateLocalData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';

    this.books.forEach((book, index) => {
      const div = document.createElement('div');
      div.classList.add('container');
      const p = document.createElement('p');
      p.innerText = `${book.title}  by  ${book.author} `;
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.classList.add('removeBtn');
      removeButton.onclick = () => this.removeBook(index);

      div.append(p);
      div.append(removeButton);
      bookContainer.appendChild(div);
    });
  }
}
const bookList = new BookList();
function addBook() {
  const title = newTitle.value.trim();
  const author = newAuthor.value.trim();

  if (title && author) {
    bookList.addBook(title, author);
    newTitle.value = '';
    newAuthor.value = '';
  } else {
    alert('Please enter title and author');
  }
}
bookList.displayBooks();
addButton.addEventListener('click', addBook);
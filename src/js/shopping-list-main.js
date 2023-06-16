import book322_1 from '../images/shopping/books_322_@1.webp';
import book322_2 from '../images/shopping/books_322_@2.webp';
import book322_11 from '../images/shopping/books_322_@1.png';
import book322_22 from '../images/shopping/books_322_@2.png';
import book265_1 from '../images/shopping/books_265_@1.webp';
import book265_2 from '../images/shopping/books_265_@2.webp';
import book265_11 from '../images/shopping/books_265_@1.png';
import book265_22 from '../images/shopping/books_265_@2.png';

import Storage from './local-storage';
import getShoppingCartMarkup from './shopping-cart';
import { countBook } from './templates/shoppingListCounter';
import { updateDatabase } from './templates/firebase';

import { SwaggerAPI } from './swagger-api.js';

import Pagination from 'tui-pagination';

const booksApi = new SwaggerAPI();

const listContainer = document.querySelector('.js-shopping-list');
const paginationContainerRef = document.querySelector('.js-tui-pagination');

const bookStorage = Storage.load('bookList');

let page;
let currentPage = 1;
let itemsPerPage;
let visiblePages;
let resizeTimeout;

document.addEventListener('DOMContentLoaded', firstPageLoaded);
window.addEventListener('resize', changePagOptionsByScreenWidth);

start();

function start() {
  if (!bookStorage || bookStorage.length === 0) {
    listContainer.innerHTML = emptyShoppingMarkup();
    return;
  }

  const totalItems = bookStorage.length;
  if (bookStorage.length > itemsPerPage) {
    paginationStart(totalItems);
  }
  createMarkup(bookStorage, currentPage);
}

function deleteCard() {
  if (bookStorage) {
    const deleteCardItem = document.querySelectorAll('.shop-cart-btn');

    deleteCardItem.forEach(btn => {
      btn.addEventListener('click', e => {
        if (
          e.target.nodeName === 'BUTTON' ||
          e.target.nodeName === 'svg' ||
          e.target.nodeName === 'use'
        ) {
          const deleteBookIndex = bookStorage.indexOf(
            bookStorage.find(
              book => book.title === e.currentTarget.dataset.title
            )
          );
          if (deleteBookIndex < 0) {
            return;
          }
          bookStorage.splice(deleteBookIndex, 1);
          Storage.save('bookList', bookStorage);
          e.target.closest('li').remove();

          if (bookStorage.length <= itemsPerPage) {
            paginationContainerRef.classList.add('is-hidden');
          }

          if (bookStorage.length === 0) {
            setTimeout(() => {
              listContainer.innerHTML = emptyShoppingMarkup();
            }, 0);

            Storage.remove('bookList');
            paginationContainerRef.classList.add('is-hidden');
          }

          if (bookStorage.length % itemsPerPage === 0) {
            if (currentPage > 1) {
              currentPage -= 1;
            }
            paginationStart(bookStorage.length);
          }
          createMarkup(bookStorage, currentPage);

          countBook();
          updateDatabase();
          return;
        }
      });
    });
  } else {
    listContainer.innerHTML = emptyShoppingMarkup();
  }
}

function emptyShoppingMarkup() {
  return `
    <p class="shopping-list-text">This page is empty, add some books and proceed to order.</p>
        <picture>
            <source media="(min-width: 768px)" srcset="
                            ${book322_1} 1x,
                            ${book322_2} 2x
                            " type="image/webp" />
            <source media="(min-width: 768px)" srcset="
                            ${book322_11} 1x,
                            ${book322_22} 2x
                            " type="image/png" />

            <source media="(max-width: 767px)" srcset="
                            ${book265_1} 1x,
                            ${book265_2} 2x
                            " type="image/webp" />
            <source media="(max-width: 767px)" srcset="
                            ${book265_11} 1x,
                            ${book265_22} 2x
                            " type="image/png" />

            <img class="shopping-list-image" src="${book265_1}" alt="Books" loading="lazy" />
        </picture>
    `;
}

function createMarkup(arrayData, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsOnPage = arrayData.slice(startIndex, endIndex);
  getShoppingCartMarkup(itemsOnPage);
  deleteCard();
}

function paginationStart(totalItems) {
  const paginationOptions = {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePages,
    page: currentPage,
  };

  const pagination = new Pagination(paginationContainerRef, paginationOptions);

  pagination.on('afterMove', event => {
    currentPage = event.page;

    createMarkup(bookStorage, currentPage);
    return currentPage;
  });
}

// Функція зміни кількості відображення карток на сторінці в залежності від ширини екрану
function changePagOptionsByScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      start();
    }, 200);
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
      start();
    }, 200);
  }
}

// Функція зміни кількості відображення карток на сторінці в залежності від ширини екрану при першої загрузці сторінки
function firstPageLoaded() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    visiblePages = 1;
    itemsPerPage = 4;
    start();
  } else if (screenWidth >= 768) {
    itemsPerPage = 3;
    visiblePages = 3;
    start();
  }
}

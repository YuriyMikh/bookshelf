import { SwaggerAPI } from './swagger-api.js';
import { Notify } from 'notiflix';
import createBook from './templates/create-book.js';
import addListener from './modal-window.js';
import emptySeeMoreBooksMarkup from './templates/empty-category-markup';
import getBodyWidth from './components/onload.js';

const booksContainer = document.querySelector('.category-list');
const title = document.querySelector('.home-title');
const loader = document.querySelector('.click-loader');
const mainContent = document.querySelector('.main-content');

const bodyWidth = getBodyWidth();

const topBooksAPI = new SwaggerAPI();

createBlock();

async function createBlock() {
  try {
    const { data } = await topBooksAPI.fetchTopBooks();

    let randomCategoryNum = [];
    function generateUniqueRandom(maxNr) {
      let random = (Math.random() * maxNr).toFixed();

      random = Number(random);

      if (!randomCategoryNum.includes(random)) {
        randomCategoryNum.push(random);
        return;
      } else {
        if (randomCategoryNum.length < maxNr) {
          return generateUniqueRandom(maxNr);
        } else {
          return false;
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      generateUniqueRandom(17);
    }

    randomCategoryNum.forEach(el => {
      let topBooks = data[el].books;
      let markUpCount = 0;

      if (bodyWidth <= 767) {
        markUpCount = 1;
      }
      if (bodyWidth >= 768 && bodyWidth < 1440) {
        markUpCount = 3;
      }
      if (bodyWidth >= 1440) {
        markUpCount = 5;
      }

      if (topBooks.length === 0) {
        Notify.failure('There are no best sellers books in this category');
        return;
      }

      const markup = `<li class="category-list-item top-list-item">
        <p class="category-name" data-category-name="${
          topBooks[0].list_name
        }">${topBooks[0].list_name}</p>
        <ul class="books-list">
          ${createBook(topBooks.slice(0, markUpCount))}
        </ul>
       <button class="category-list-button">see more</button>  
      </li>`;

      booksContainer.insertAdjacentHTML('beforeend', markup);
      findBtn();
    });
  } catch (error) {
    Notify.failure('Something went wrong. Please, try later.');
  }
  addListener();
}

function findBtn() {
  const seeMoreBtnEls = document.querySelectorAll('.category-list-button');

  seeMoreBtnEls.forEach(seeMoreBtn => {
    seeMoreBtn.addEventListener('click', onSeeMoreBtnClick);
  });
}

async function onSeeMoreBtnClick(event) {
  loader.classList.remove('click-is-hidden');
  try {
    setTimeout(async () => {
      const name =
        event.target.previousElementSibling.previousElementSibling.textContent;

      topBooksAPI.categoryName = name;
      const { data } = await topBooksAPI.fetchBooksByCategory();

      if (data.length === 0) {
        booksContainer.innerHTML = emptySeeMoreBooksMarkup();
        return;
      }

      title.innerHTML = divideTitleElements(name);
      booksContainer.classList.add('category-list-click');
      booksContainer.innerHTML = createBook(data);
      addActiveClassToCategoryListItem(name);
      addListener();
      mainContent.scrollIntoView({
        behavior: 'smooth',
      });
      loader.classList.add('click-is-hidden');
    }, 250);
  } catch (error) {
    Notify.failure('Something went wrong. Please, try later.');
  }
}

function divideTitleElements(categoryName) {
  const words = categoryName.split(' ');
  const lastWord = words[words.length - 1];
  const otherWords = words.slice(0, words.length - 1).join(' ');

  return `<span class="home-title-decor">${otherWords} </span>${lastWord}`;
}

function addActiveClassToCategoryListItem(name) {
  const asideCategoryItems = document.querySelectorAll('.aside-item');
  const allCategoriesTitle = document.querySelector('.aside-title');

  asideCategoryItems.forEach(asideCategoryItem => {
    if (name === asideCategoryItem.textContent) {
      allCategoriesTitle.classList.toggle('active');
      asideCategoryItem.classList.toggle('active');
    }
  });
}

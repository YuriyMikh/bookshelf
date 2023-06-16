import { SwaggerAPI } from './swagger-api';
import createCategoriesMarkup from './templates/create-categories';
import addListener from './modal-window.js';
import emptySeeMoreBooksMarkup from './templates/empty-category-markup';

const categoriesList = document.querySelector('.aside-list');
const categoriesTitle = document.querySelector('.aside-title');
const renderingCategories = document.querySelector('.main-content');
const loader = document.querySelector('.click-loader');

const swaggerCategoriesApi = new SwaggerAPI();

const createCategoriesItem = async () => {
  try {
    const { data } = await swaggerCategoriesApi.fetchBooksCategoryList();
    const searchCategory = data
      .map(category => {
        return `<li class="aside-item"><a class="aside-link"  aria-label="${category.list_name}">${category.list_name}</a></li>`;
      })
      .join('');
    categoriesList.innerHTML = searchCategory;
  } catch (error) {
    console.log(error);
  }
};
createCategoriesItem();

let activeCategoryLink = null;

//ф-я відображення книг
const onCategoriesLinkClick = event => {
  if (event.target.nodeName !== 'A') {
    return;
  }

  const value = event.target.textContent;
  swaggerCategoriesApi.categoryName = value;

  if (activeCategoryLink) {
    activeCategoryLink.classList.remove('active');
  }

  activeCategoryLink = event.target;
  activeCategoryLink.classList.add('active');
  categoriesTitle.classList.remove('active');

  const createMarkupCategories = async () => {
    loader.classList.remove('click-is-hidden');
    try {
      setTimeout(async () => {
        const { data } = await swaggerCategoriesApi.fetchBooksByCategory(value);
        if (data.length === 0) {
          renderingCategories.innerHTML = emptySeeMoreBooksMarkup();
          return;
        }
        const listName = data[0].list_name;

        const words = listName.split(' ');
        const lastWord = words[words.length - 1];
        const otherWords = words.slice(0, words.length - 1).join(' ');

        const decoratedListName = `${otherWords} <span class="categories-title-decor">${lastWord}</span>`;
        renderingCategories.innerHTML = `<h1 class="categories-title">${decoratedListName}</h1> <ul class="categories-item">${createCategoriesMarkup(
          data
        )}</ul>`;
        addListener();
        renderingCategories.scrollIntoView({
          behavior: 'smooth',
        });
        loader.classList.add('click-is-hidden');
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };

  createMarkupCategories();
};

categoriesList.addEventListener('click', onCategoriesLinkClick);

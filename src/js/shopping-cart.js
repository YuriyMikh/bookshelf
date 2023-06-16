import blackAmazonPng from '../images/shopping/amazon.png';
import blackAmazonWebp from '../images/shopping/amazon.webp';
import appleBook from '../images/shopping/apple.png';
import appleWebp from '../images/shopping/apple.webp';
import bookShopIcon from '../images/shopping/bookshop.png';
import bookShopWebp from '../images/shopping/bookshop.webp';
import whiteAmazonPng from '../images/shopping/amazon-white.png';
import whiteAmazonWebp from '../images/shopping/amazon-white.webp';
import sprite from '../images/sprite.svg';
import getBodyWidth from './components/onload';

const listContainer = document.querySelector('.js-shopping-list');
const isHtmlElDark = document.documentElement.classList.contains('dark');
let amazonImg = blackAmazonPng;
let amazonWebp = blackAmazonWebp;
let newTitle;

const bodyWidth = getBodyWidth();

export default function (bookColection) {
  const markup = bookColection
    .map(book => {
      let {
        title,
        list_name,
        description,
        author,
        book_image,
        amazon,
        apple,
        bookShop,
      } = book;
      if (isHtmlElDark) {
        amazonImg = whiteAmazonPng;
        amazonWebp = whiteAmazonWebp;
      }
      description.length !== 0
        ? description
        : (description =
            'We are pleased to inform you that all information about this book you can found on partner resources (such as Amazon, etc.)');
      newTitle = title;

      if (bodyWidth <= 767) {
        list_name.lehgth > 20
          ? (list_name = list_name.slice(0, 20) + '...')
          : (list_name = list_name);
        // list_name = list_name.slice(0, 20) + '...';
        description = description.slice(0, 85) + '...';
        title.length > 16
          ? (newTitle = title.slice(0, 16) + '...')
          : (newTitle = title);
      }
      if (bodyWidth < 375) {
        list_name = list_name.slice(0, 10) + '...';
      }
      if (bodyWidth >= 768 && bodyWidth < 1440) {
        description.length > 1 && description.length < 250
          ? description
          : description.slice(0, 250) + '...';
      }
      return `<li class="shop-cart-container">
            <div class="shop-cart-wrap">
                <div class="shop-image-wrapper">
                    <img class="shop-image" src="${book_image}" alt="${title}">
                </div>
                <div class="shop-cart-info">
                    <h2 class="shop-cart-title">${newTitle}</h2>
                    <h3 class="shop-cart-category">${list_name}</h3>
                    <p class="shop-cart-description">${description}</p>
                    <div class="shop-cart-bottom-wrap">
                        <h4 class="shop-cart-author">${author}</h4>
                        <ul class="shop-cart-media">
                            <li class="shop-cart-media-item">
                                <a href="${amazon}" target="_blank" rel="noopener noreferrer" aria-label="Amazon">
                                    <picture class="amazon-picture">
                                        <source srcset="${amazonWebp}" type="image/webp" />
                                        <source srcset="${amazonImg}" type="image/png" />
                                        <img class="media-icon amazon-icon" src="${amazonImg}" alt="Amazon logo" />
                                    </picture>
                                </a>    
                            </li>
                            <li class="shop-cart-media-item">
                                <a href="${apple}" target="_blank" rel="noopener noreferrer" aria-label="Apple Books">
                                    <picture>
                                        <source srcset="${appleWebp}" type="image/webp" />
                                        <source srcset="${appleBook}" type="image/png" />
                                        <img class="media-icon" src="${appleBook}" alt="Apple book logo" />
                                    </picture>
                                </a>
                            </li>
                            <li class="shop-cart-media-item">
                                <a href="${bookShop}" target="_blank" rel="noopener noreferrer" aria-label="Bookshop">
                                    <picture>
                                        <source srcset="${bookShopWebp}" type="image/webp" /> 
                                        <source srcset="${bookShopIcon}" type="image/png" />
                                        <img class="media-icon" src="${bookShopIcon}" alt="Book shop logo" />
                                    </picture>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button class="shop-cart-btn" type="button" data-title="${title}" aria-label="Remove button">
                        <svg class="shop-cart-btn-trash">
                            <use href="${sprite}#trash"></use>
                        </svg>
                    </button>
                </div>
            </div>
          </div>
        </li>`;
    })
    .join('');

  return (listContainer.innerHTML = `
         <ul class="shop-cart-list">
             ${markup}
         </ul>
         `);
}

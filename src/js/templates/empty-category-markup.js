import book322_1 from '../../images/shopping/books_322_@1.webp';
import book322_2 from '../../images/shopping/books_322_@2.webp';
import book322_11 from '../../images/shopping/books_322_@1.png';
import book322_22 from '../../images/shopping/books_322_@2.png';
import book265_1 from '../../images/shopping/books_265_@1.webp';
import book265_2 from '../../images/shopping/books_265_@2.webp';
import book265_11 from '../../images/shopping/books_265_@1.png';
import book265_22 from '../../images/shopping/books_265_@2.png';

export default function emptySeeMoreBooksMarkup() {
  return `
    <p class="shopping-list-text">Sorry. Could not find books of this category.</p>
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

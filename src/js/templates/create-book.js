export default function createBook(bookInfo) {
  const markup = bookInfo
    .map(book => {
      const { book_image, description, title, author, _id } = book;
      return `<li class="books-list-item">
                 <a class="book-link" href="" data-id="${_id}" aria-label="${title}">
                    <div class="book-thumb">
                      <img class="book-image" src="${book_image}" alt="${description}" />

                        <div class="book-overlay">
                       <p class="book-overlay-text">quick view</p>
                       </div>
                       </div>                     
                     <div class="book-card-content">
                     <h2 class="book-title">${title}</h2>
                     <p class="book-author">${author}</p>
                     </div>
                 </a>                    
              </li>`;
    })
    .join('');
  return markup;
}

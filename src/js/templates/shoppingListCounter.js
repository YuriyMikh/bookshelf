import Storage from '../local-storage';
const shoppingCountEls = document.querySelectorAll('.header-shopping-count');

export const countBook = () => {
  const storageBook = Storage.load('bookList');
  for (const shoppingCountEl of shoppingCountEls) {
    if (storageBook) {
      if (storageBook.length === 0) {
        shoppingCountEl.classList.add('is-hidden');
        return;
      }
      shoppingCountEl.classList.remove('is-hidden');
      shoppingCountEl.textContent = storageBook.length;
    } else {
      shoppingCountEl.classList.add('is-hidden');
    }
  }
};

countBook();

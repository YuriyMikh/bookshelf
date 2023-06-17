import Storage from '../local-storage';

//-------Вячеслав:
// const shoppingCountEls = document.querySelectorAll('.header-shopping-count');

// export const countBook = () => {
//   const storageBook = Storage.load('bookList');
//   for (const shoppingCountEl of shoppingCountEls) {
//     if (storageBook) {
//       if (storageBook.length === 0) {
//         shoppingCountEl.classList.add('is-hidden');
//         return;
//       }
//       shoppingCountEl.classList.remove('is-hidden');
//       shoppingCountEl.textContent = storageBook.length;
//     } else {
//       shoppingCountEl.classList.add('is-hidden');
//     }
//   }
// };


//----------Я:
const shoppingCountEl = document.querySelector('.header-shopping-count');

export const countBook = () => {
  const storageBook = Storage.load('bookList');

  if (!storageBook || storageBook.length === 0) {
    return
  } else {
    shoppingCountEl.classList.remove('is-hidden');
    shoppingCountEl.textContent = storageBook.length;
  }
};

countBook();

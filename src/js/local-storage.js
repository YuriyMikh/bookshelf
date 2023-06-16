const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Remove item error: ', error.message);
  }
};


const addBookToStorage = book => { // функція добавляє книжки в локал сторедж, потрібно лише передати обєкт який приходить з API
  const bookStorage = load('bookList') || [];
  const { title, list_name, description, author, book_image } = book;
  const bookInfo = {
      title,
      list_name,
      description,
      author,
      book_image,
      amazon: book.buy_links[0].url,
      apple: book.buy_links[1].url,
      bookShop: book.buy_links[4].url,
  }
  if (bookStorage.length !== 0) {
    const bookInStorage = bookStorage.find(book => book.title === bookInfo.title);
    
    if (!bookInStorage) {
      bookStorage.push(bookInfo);
      save('bookList', bookStorage);
    }
    return;
  }
  bookStorage.push(bookInfo);

  save('bookList', bookStorage);
}

export default {
  save,
  load,
  remove,
  addBookToStorage,
};

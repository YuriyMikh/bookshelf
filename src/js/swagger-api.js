import axios from 'axios';

export class SwaggerAPI {
  static BASE_URL = 'https://books-backend.p.goit.global/';

  constructor() {
    this.categoryName = null;
    this.bookId = null;
  }

  fetchBooksCategoryList() {
    return axios.get(`${SwaggerAPI.BASE_URL}books/category-list`);
  }

  fetchTopBooks() {
    return axios.get(`${SwaggerAPI.BASE_URL}books/top-books`);
  }

  fetchBooksByCategory() {
    return axios.get(
      `${SwaggerAPI.BASE_URL}books/category?category=${this.categoryName}`
    );
  }

  fetchBookById() {
    return axios.get(`${SwaggerAPI.BASE_URL}books/${this.bookId}`);
  }
}

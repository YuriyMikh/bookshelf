const loader = document.querySelector('.loader');

loaderFunc();

function loaderFunc(params) {
  window.addEventListener('load', event => {
    loader.classList.add('loader--hidden');

    loader.addEventListener('transitionend', () => {
      loader.classList.remove('loader');
    });
  });
}

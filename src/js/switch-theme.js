import storage from './local-storage.js';
import whiteAmazonPng from '../images/shopping/amazon-white.png';
import whiteAmazonWebp from '../images/shopping/amazon-white.webp';
import blackAmazonPng from '../images/shopping/amazon.png';
import blackAmazonWebp from '../images/shopping/amazon.webp';

const switcher = document.querySelector('.js-themes');
const htmlEl = document.documentElement;

initTheme();

switcher.addEventListener('change', onSwitcherChange);

function onSwitcherChange(event) {
  if (event.target.nodeName === 'INPUT') {
    resetTheme();
  }
}

function resetTheme() {
  if (switcher.children.switcher_checkbox.checked) {
    storage.save('theme', 'dark');
    changeAmazonIcon('dark');
  } else {
    storage.remove('theme');
    changeAmazonIcon('light');
  }

  themeClassToggle();
}

function initTheme() {
  const storageData = storage.load('theme');

  if (storageData === 'dark') {
    switcher.children.switcher_checkbox.checked = true;
    themeClassToggle();
  }
}

function themeClassToggle() {
  htmlEl.classList.toggle('light');
  htmlEl.classList.toggle('dark');
}

function changeAmazonIcon(color) {
  const storageData = storage.load('bookList');
  const amazonPictures = document.querySelectorAll('.amazon-picture');
  if (storageData) {
    if (color === 'dark') {
      for (const amazonPicture of amazonPictures) {
        amazonPicture.children[0].srcset = whiteAmazonWebp;
        amazonPicture.children[1].srcset = whiteAmazonPng;
      }
    }
  }
  if (color === 'light') {
    for (const amazonPicture of amazonPictures) {
      amazonPicture.children[0].srcset = blackAmazonWebp;
      amazonPicture.children[1].srcset = blackAmazonPng;
    }
  }
}

import { supUkrFonds } from './aside-support-fonds';

//====================>>>>>>RANDERING FONDS<<<<<<=========================

const ulElement = document.querySelector('.sup-content-wrp');

const listItems = supUkrFonds.map(
  (item, index) => `
  <li class="support-company">
    <p class="sup-comp-numb">${(index + 1).toString().padStart(2, '0')}</p>
    <a class="sub-comp-ref" href="${
      item.url
    }" target="_blank" rel="noopener noreferrer" aria-label="${item.title}">
      <picture>
        <source srcset="${item.imgWebp} 1x, ${
    item.imgWebp2X
  } 2x" type="image/webp" />
        <source srcset="${item.img} 1x, ${item.img2X} 2x" type="image/png" />
        <img class="sup-company-img" src="${item.img}" alt="${item.title}" />
      </picture>
    </a>
  </li>
`
);

ulElement.innerHTML = listItems.join('');

// ===================>>>>>SCROLL & CLICK-UP/DOWN<<<<<===================

const svgDown = document.getElementById('svgDown');
const svgUp = document.getElementById('svgUp');
const container = document.querySelector('.sup-content-wrp');

function handleScroll() {
  if (container.scrollTop === 0) {
    svgUp.classList.add('is-hidden-sup-ukr');
    svgDown.classList.remove('is-hidden-sup-ukr');
  } else {
    svgUp.classList.remove('is-hidden-sup-ukr');
    svgDown.classList.add('is-hidden-sup-ukr');
  }
}

function handleClick() {
  if (container.scrollTop === 0) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  } else {
    container.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

svgDown.addEventListener('click', handleClick);
svgUp.addEventListener('click', handleClick);

container.addEventListener('scroll', handleScroll);

import refs from './components/refs';
import storage from './local-storage';
import { Notify } from 'notiflix';

export function onBurgerAuthBtnChange(state) {
  const {
    burgerSignUpBtn,
    burgerSignUpBtnText,
    burgerArrowRightIcon,
    burgerUserIcon,
    burgerLogOutBtn,
  } = refs;

  if (state === 'signedUp' || state === 'signedIn') {
    setTimeout(() => {
      const userInfo = storage.load('userData');
      burgerSignUpBtnText.textContent = userInfo.userName;
    }, 0);
    burgerSignUpBtn.style.border = 'none';
    burgerSignUpBtn.style.backgroundColor = 'transparent';
    burgerSignUpBtnText.classList.add('grow');
    burgerArrowRightIcon.classList.add('is-hidden');
    burgerUserIcon.classList.remove('is-hidden');
    burgerLogOutBtn.classList.remove('is-hidden');
  }

  if (state === 'signedOut') {
    burgerSignUpBtn.style.backgroundColor = '#4F2EE8';
    burgerSignUpBtnText.textContent = 'Sign up';
    burgerLogOutBtn.classList.add('is-hidden');
    burgerArrowRightIcon.classList.remove('is-hidden');
    burgerUserIcon.classList.add('is-hidden');
    burgerSignUpBtn.style.border = '1.5px solid #111';
    burgerSignUpBtnText.classList.remove('grow');
  }
}

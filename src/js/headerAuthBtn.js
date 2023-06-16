import refs from './components/refs';
import storage from './local-storage';
import { Notify } from 'notiflix';

export function onHeaderAuthBtnChange(state) {
  const {
    authBackdrop,
    headerUserIcon,
    headerSignUpBtnText,
    headerArrowDownIcon,
    headerArrowRightIcon,
    headerLogOutBtn,
  } = refs;

  if (state === 'signedUp' || state === 'signedIn') {
    setTimeout(() => {
      const userInfo = storage.load('userData');
      headerSignUpBtnText.textContent = userInfo.userName;
    }, 0);
    authBackdrop.classList.add('is-hidden');
    headerUserIcon.classList.remove('is-hidden');
    headerArrowDownIcon.classList.remove('is-hidden');
    headerArrowRightIcon.classList.add('is-hidden');
    headerSignUpBtnText.classList.add('grow');
  }

  if (state === 'signedOut') {
    headerLogOutBtn.classList.add('is-hidden');
    headerSignUpBtnText.classList.remove('grow');
    headerSignUpBtnText.textContent = 'Sign up';
    headerUserIcon.classList.add('is-hidden');
    headerArrowDownIcon.classList.add('is-hidden');
    headerArrowRightIcon.classList.remove('is-hidden');
  }
}

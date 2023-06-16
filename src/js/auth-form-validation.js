import { Notify } from 'notiflix';
import { checkPattern } from './templates/check-patterns';

const refs = {
  authForm: document.querySelector('.authorization-form'),
  userName: document.querySelector('.js-auth-form-name-input'),
  userEmail: document.querySelector('.js-auth-form-email-input'),
  userPassword: document.querySelector('.js-auth-form-password-input'),
};

export function onAuthFormValidation(state) {
  if (state === 'signedUp') {
    if (
      refs.userName.value.trim() === '' ||
      refs.userEmail.value.trim() === '' ||
      refs.userPassword.value.trim() === ''
    ) {
      Notify.info('Please fill out all form fields.');
      return false;
    }

    if (!checkPattern('name', refs.userName.value.trim())) {
      Notify.warning(
        'Invalid name! Name must contain only letters and at least 2 symbols.'
      );
      return false;
    }
  }

  if (!checkPattern('email', refs.userEmail.value.trim())) {
    Notify.warning('Invalid email!');
    return false;
  }

  if (!checkPattern('password', refs.userPassword.value.trim())) {
    Notify.warning(
      'Invalid password! Password must contain at least 6 or more characters.'
    );
    return false;
  }

  return true;
}

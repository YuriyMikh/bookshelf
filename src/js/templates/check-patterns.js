import { Notify } from 'notiflix';

export function checkPattern(inputName, inputValue) {
  const patterns = {
    namePattern: /^[A-Za-z]{2,16}$/,
    emailPattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
    passwordPattern: /[A-Za-z0-9]{6,}/,
  };

  if (inputName === 'name') {
    return patterns.namePattern.test(inputValue);
  }

  if (inputName === 'email') {
    return patterns.emailPattern.test(inputValue);
  }

  if (inputName === 'password') {
    return patterns.passwordPattern.test(inputValue);
  }
}

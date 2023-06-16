import { initializeApp } from 'firebase/app';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, set, ref, update } from 'firebase/database';
import storage from './local-storage';
import { getUserDatabase } from './templates/firebase';
import { countBook } from './templates/shoppingListCounter';
import { Notify } from 'notiflix';
import { onAuthFormValidation } from './auth-form-validation';
import { onHeaderAuthBtnChange } from './headerAuthBtn';
import { onBurgerAuthBtnChange } from './burgerAuthBtn';
import refs from './components/refs';

const firebaseConfig = {
  apiKey: 'AIzaSyA-c5ktNEt2bpwdrjlWbguPygCPHCJWGLM',
  authDomain: 'authentication-6949a.firebaseapp.com',
  databaseURL: 'https://authentication-6949a-default-rtdb.firebaseio.com',
  projectId: 'authentication-6949a',
  storageBucket: 'authentication-6949a.appspot.com',
  messagingSenderId: '312217541484',
  appId: '1:312217541484:web:32ea78d2e9302b00f63149',
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const auth = getAuth(app);

const {
  authForm,
  userNameInput,
  userEmailInput,
  userPasswordInput,
  authSignUpBtnSubmit,
  authSignInBtnSubmit,
  authSignUpBtnChange,
  authSignInBtnChange,
  headerSignUpBtnText,
  headerLogOutBtn,
  burgerSignUpBtnText,
  burgerLogOutBtn,
} = refs;

authForm.addEventListener('submit', onAuthFormSignUpSubmit);
authSignInBtnSubmit.addEventListener('click', onAuthFormSignInSubmit);

// ф-я "реестрації"

function onAuthFormSignUpSubmit(event) {
  event.preventDefault();

  if (!onAuthFormValidation('signedUp')) {
    return;
  }

  const storageData = storage.load('bookList') || [];

  const userName = userNameInput.value.trim();
  const userEmail = userEmailInput.value.trim();
  const userPassword = userPasswordInput.value.trim();

  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(userCredential => {
      authForm.reset();

      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid), {
        name: userName,
        email: userEmail,
        password: userPassword,
        shoppingList: JSON.stringify(storageData),
      });

      storage.save('userData', { userId: user.uid, userName });

      onHeaderAuthBtnChange('signedUp');
      onBurgerAuthBtnChange('signedUp');

      setTimeout(() => {
        Notify.success(
          'Thanks for signing up. Welcome to Bookshelf! We are happy to have you on board.'
        );
        countBook();
      }, 500);
    })
    .catch(error => {
      console.log(error);
    });
}

//ф-я "увійти у систему"

function onAuthFormSignInSubmit(event) {
  event.preventDefault();

  if (!onAuthFormValidation('signedIn')) {
    return;
  }

  const userEmail = userEmailInput.value.trim();
  const userPassword = userPasswordInput.value.trim();

  authForm.reset();

  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then(userCredential => {
      const user = userCredential.user;

      const dt = new Date();
      storage.save('userData', { userId: user.uid });

      update(ref(database, 'user/' + user.uid), {
        last_login: dt,
      });

      getUserDatabase('shoppingList')
        .then(data => {
          storage.save('bookList', JSON.parse(data));
        })
        .catch(error => {
          console.log(error);
        });

      getUserDatabase('name')
        .then(data => {
          setTimeout(() => {
            onHeaderAuthBtnChange('signedIn');
            onBurgerAuthBtnChange('signedIn');
            Notify.success(
              `Hello ${
                data.charAt(0).toUpperCase() + data.slice(1)
              }! You have signed in successfully.`
            );
            countBook();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

const checkAuthState = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      onHeaderAuthBtnChange('signedIn');
      onBurgerAuthBtnChange('signedIn');
    }
  });
};

checkAuthState();

const userSignOut = async () => {
  await signOut(auth);
  onHeaderAuthBtnChange('signedOut');
  onBurgerAuthBtnChange('signedOut');

  storage.remove('userData');
  storage.remove('bookList');

  setTimeout(() => {
    countBook();
    Notify.info(
      'You have successfully logged out. We hope to see you back soon!'
    );
  }, 250);
};

headerLogOutBtn.addEventListener('click', userSignOut);
burgerLogOutBtn.addEventListener('click', userSignOut);

const onOptionSignInBtnClick = function (event) {
  userNameInput.classList.add('is-hidden');
  authSignUpBtnSubmit.classList.add('is-hidden');
  authSignInBtnSubmit.classList.remove('is-hidden');
  authSignUpBtnChange.classList.remove('authorization-btn-active');
  authSignInBtnChange.classList.add('authorization-btn-active');
};

const onOptionSignUpBtnClick = function (event) {
  userNameInput.classList.remove('is-hidden');
  authSignUpBtnSubmit.classList.remove('is-hidden');
  authSignInBtnSubmit.classList.add('is-hidden');
  authSignUpBtnChange.classList.add('authorization-btn-active');
  authSignInBtnChange.classList.remove('authorization-btn-active');
};

authSignInBtnChange.addEventListener('click', onOptionSignInBtnClick);
authSignUpBtnChange.addEventListener('click', onOptionSignUpBtnClick);

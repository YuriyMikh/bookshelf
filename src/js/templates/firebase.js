import Storage from '../local-storage';
import { ref, update, get, child } from 'firebase/database';
import { database } from '../aut-form';

export function updateDatabase() {
  const updatedStorage = Storage.load('bookList') || [];
  const userData = Storage.load('userData');
  update(ref(database, 'users/' + userData.userId), {
    shoppingList: JSON.stringify(updatedStorage),
  });
}

export function getUserDatabase(param) {
  const userData = Storage.load('userData');
  const dbRef = ref(database);
  const getData = get(child(dbRef, `users/${userData.userId}/${param}`))
    .then(snap => {
      if (snap._node.value_) {
        return snap._node.value_;
      } else {
        return [];
      }
    })
    .catch(error => {
      console.log(error);
    });

  return getData;
}

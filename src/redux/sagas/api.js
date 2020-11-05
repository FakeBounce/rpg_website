import firebase from 'firebase';
import { eventChannel } from 'redux-saga';

export const firebaseDbRef = path => {
  return firebase.database().ref(path);
};

export const firebaseDbSet = (path = '', toSet = {}) => {
  return firebase
    .database()
    .ref(path)
    .set(toSet);
};

export const firebaseDbNewKey = (path = '') => {
  return firebase
    .database()
    .ref(path)
    .push().key;
};

export const firebaseDbOnce = (path = '', once = 'value') => {
  return firebase
    .database()
    .ref(path)
    .once(once)
    .then(snapshot => {
      return snapshot.val();
    })
    .catch(error => {
      console.log('error', error);
      return error;
      // this.triggerError(error);
    });
};

export function onValueChannel(path = '') {
  try {
    const ref = firebase.database().ref(path);

    return eventChannel(emit => {
      const callback = ref.on('value', snapshot => {
        if (snapshot.val()) {
          emit(snapshot.val());
        }
      });

      // unsubscribe function
      return () => ref.off('value', callback);
    });
  } catch (error) {
    console.log('An error occured:', error);
  }
}

export const storageTempReplacing = (
  uid = '',
  characterId = '',
  picture = {},
) => {
  let storageRef = firebase.storage().ref();
  const extension = picture.name.split('.')[1] || '.png';

  storageRef
    .child(`images/${uid}/temp_character.${extension}`)
    .delete()
    .catch(error => {
      console.log('An error occured:', error);
      // Uh-oh, an error occurred!
      // triggerError(error);
    });

  storageRef
    .child(`images/${uid}/character_${characterId}.${extension}`)
    .put(picture)
    .catch(error => {
      console.log('An error occured:', error);
      // Uh-oh, an error occurred!
      // triggerError(error);
    });
};

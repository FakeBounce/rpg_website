import firebase from "firebase";

export const firebaseDbRef = path => {
  return firebase.database().ref(path);
};

export const firebaseDbSet = (path = "", toSet = {}) => {
  return firebase
    .database()
    .ref(path)
    .set(toSet);
};

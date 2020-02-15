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

export const firebaseDbOnce = (path = "", once = "value") => {
  return firebase
    .database()
    .ref(path)
    .once(once)
    .then(snapshot => {
      return snapshot.val();
    })
    .catch(error => {
      console.log("error", error);
      // this.triggerError(error);
    });
};

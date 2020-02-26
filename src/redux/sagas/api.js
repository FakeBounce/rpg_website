import firebase from "firebase";
import { eventChannel } from "redux-saga";

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
      return error;
      // this.triggerError(error);
    });
};

export function onValueChannel(path = "") {
  try {
    const ref = firebase.database().ref(path);

    return eventChannel(emit => {
      const callback = ref.on("value", snapshot => {
        emit(snapshot.val());
      });

      // unsubscribe function
      return () => ref.off("value", callback);
    });
  } catch (error) {
    console.log("An error occured:", error);
  }
}

import firebase from "firebase";

export const firebaseDbSet = (path = "", toSet = "") => {
  return firebase
    .database()
    .ref(path)
    .set({
      musicVolume: 50,
      musicNameFirst: "",
      musicVolumeFirst: 0,
      musicNameSecond: "",
      musicVolumeSecond: 0,
      musicStatusFirst: "STOPPED",
      musicStatusSecond: "STOPPED",
    });
};

export const protectedRequest = token => options =>
  request({
    headers: { ...defaultHeaders, "Mnz-Token": token },
    ...options,
  });

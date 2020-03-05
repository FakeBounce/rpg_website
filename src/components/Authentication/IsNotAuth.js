import React, { useState } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import Logs from "./Logs";
import { defaultState } from "../Utils/Constants";
import { setUid, setUserInfos } from "../../redux/actions/actionsUserInfos";
import { setIsAuth, setIsAdmin } from "../../redux/actions/actionsAppState";
import {
  CALL_GET_ALL_STORIES,
  CALL_PRINT_ERROR,
} from "../../redux/actionsTypes/actionsTypesAppState";
import AuthButtons from "./AuthButtons";
import AuthForm from "./AuthForm";

const styledAuthContainer = {
  height: "100%",
  display: "flex",
};
const styledAuthLeftContainer = { width: "50%", height: "100%" };
const styledAuthHeader = {
  position: "absolute",
  width: "100%",
  top: 30,
  display: "flex",
  justifyContent: "center",
  letterSpacing: 13,
};

const styledAuthRightContainer = {
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  paddingTop: 70,
  paddingBottom: 50,
  paddingLeft: 30,
};

const IsNotAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatchSetUserInfos = payload => {
    dispatch(setUserInfos(payload));
  };
  const dispatchSetUid = payload => {
    dispatch(setUid(payload));
  };
  const dispatchSetIsAuth = payload => {
    dispatch(setIsAuth(payload));
  };
  const dispatchSetIsAdmin = payload => {
    dispatch(setIsAdmin(payload));
  };
  const dispatchCallGetStories = () => {
    dispatch({ type: CALL_GET_ALL_STORIES });
  };
  const dispatchCallPrintError = payload => {
    dispatch({ type: CALL_PRINT_ERROR, payload });
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      signIn();
    }
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .once("value")
          .then(snapshot => {
            dispatchSetIsAdmin(snapshot.val().isAdmin);
            dispatchSetIsAuth(true);
            dispatchSetUserInfos({
              uid: firebase.auth().currentUser.uid,
              email,
              password,
              pseudo: snapshot.val().pseudo,
              characters: snapshot.val().characters,
            });
            dispatchCallGetStories();
            localStorage.setItem(
              "appState",
              JSON.stringify({
                ...defaultState,
                ...snapshot.val(),
                email,
                isAuth: true,
                password,
                uid: firebase.auth().currentUser.uid,
                isAdmin: snapshot.val().isAdmin,
              }),
            );
          });
      })
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error.message);
      });
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid)
          .set({
            photoUrl: firebase.auth().currentUser.photoURL,
            name: firebase.auth().currentUser.displayName,
          })
          .catch(error => {
            dispatchCallPrintError(error.message);
          });
        dispatchSetIsAuth(true);
        dispatchSetUserInfos({
          uid: firebase.auth().currentUser.uid,
          email,
          password,
        });
        dispatchSetUid(firebase.auth().currentUser.uid);
        dispatchCallGetStories();
      })
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error.message);
      });
  };

  return (
    <div style={styledAuthContainer}>
      <h1 style={styledAuthHeader}>RPG PLAYER</h1>
      <div style={styledAuthLeftContainer}>
        <img
          src={"./common/homepage.jpg"}
          alt={"homepage"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div style={styledAuthRightContainer}>
        <div>
          <AuthForm
            email={email}
            password={password}
            handleKeyPress={handleKeyPress}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          <AuthButtons signIn={signIn} signUp={signUp} />
        </div>
        <Logs />
      </div>
    </div>
  );
};

export default IsNotAuth;

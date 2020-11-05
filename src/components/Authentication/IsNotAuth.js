import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import Logs from './Logs';
import { defaultState } from '../Utils/Constants';
import { setUid, setUserInfos } from '../../redux/actions/actionsUserInfos';
import { setIsAuth, setIsAdmin } from '../../redux/actions/actionsAppState';
import {
  CALL_GET_ALL_STORIES,
  CALL_PRINT_ERROR,
} from '../../redux/actionsTypes/actionsTypesAppState';
import AuthButtons from './AuthButtons';
import AuthForm from './AuthForm';

const styledAuthContainer = {
  height: '100%',
  display: 'flex',
};
const styledAuthLeftContainer = { width: '50%', height: '100%' };
const styledAuthHeader = {
  position: 'absolute',
  width: '100%',
  top: 30,
  display: 'flex',
  justifyContent: 'center',
  letterSpacing: 13,
};

const styledAuthRightContainer = {
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  paddingTop: 70,
  paddingBottom: 50,
  paddingLeft: 30,
};

const IsNotAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (event.key === 'Enter') {
      signIn();
    }
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        signedInFlow(result);
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
      .then(snapshot => {
        signedUpFlow(snapshot.val());
      })
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error.message);
      });
  };

  const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        signedInFlow(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };

  const signedInFlow = result => {
    firebase
      .database()
      .ref('/users/' + result.user.uid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          dispatchSetIsAdmin(snapshot.val().isAdmin);
          dispatchSetIsAuth(true);
          dispatchSetUserInfos({
            uid: result.user.uid,
            email,
            password,
            pseudo: snapshot.val().pseudo,
            characters: snapshot.val().characters,
          });
          dispatchCallGetStories();
          localStorage.setItem(
            'appState',
            JSON.stringify({
              ...defaultState,
              ...snapshot.val(),
              email,
              isAuth: true,
              password,
              uid: result.user.uid,
              isAdmin: snapshot.val().isAdmin,
            }),
          );
        } else {
          signedUpFlow(result);
        }
      });
  };

  const signedUpFlow = result => {
    firebase
      .database()
      .ref('users/' + result.user.uid)
      .set({
        photoUrl: result.user.photoURL,
        name: result.user.displayName,
      })
      .catch(error => {
        dispatchCallPrintError(error.message);
      });
    dispatchSetIsAuth(true);
    dispatchSetUserInfos({
      uid: result.user.uid,
      email,
      password,
    });
    dispatchSetUid(result.user.uid);
    dispatchCallGetStories();
  };

  return (
    <div style={styledAuthContainer}>
      <h1 style={styledAuthHeader}>RPG PLAYER</h1>
      <div style={styledAuthLeftContainer}>
        <img
          src={'./common/homepage.jpg'}
          alt={'homepage'}
          style={{ width: '100%', height: '100%' }}
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
          <AuthButtons
            signIn={signIn}
            signUp={signUp}
            signInGoogle={signInGoogle}
          />
        </div>
        <Logs />
      </div>
    </div>
  );
};

export default IsNotAuth;

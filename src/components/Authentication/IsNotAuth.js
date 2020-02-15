import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import ButtonLarge from "../Utils/ButtonLarge";
import Logs from "./Logs";
import { defaultState } from "../Utils/Constants";
import {
  setAllCharacters,
  setUid,
  setUserInfos,
} from "../../redux/actions/actionsUserInfos";
import { connect } from "react-redux";
import { setIsAuth, setIsAdmin } from "../../redux/actions/actionsAppState";
import {
  CALL_GET_ALL_STORIES,
  CALL_LISTEN_STORY_USERS,
  CALL_PRINT_ERROR,
} from "../../redux/actionsTypes/actionsTypesAppState";

class IsNotAuth extends Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.signIn();
    }
  };

  signIn = () => {
    const {
      doSetState,
      dispatchSetUserInfos,
      dispatchSetIsAuth,
      dispatchSetIsAdmin,
      dispatchCallGetStories,
      dispatchCallListenUsers,
      dispatchCallPrintError,
    } = this.props;
    const { email, password } = this.state;

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
            dispatchCallListenUsers();
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

  signUp = () => {
    const {
      dispatchCallPrintError,
      dispatchSetUid,
      dispatchSetUserInfos,
      dispatchSetIsAuth,
      dispatchCallGetStories,
      dispatchCallListenUsers,
    } = this.props;
    const { email, password } = this.state;
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
        dispatchCallListenUsers();
        dispatchCallGetStories();
      })
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error.message);
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div style={{ height: "100%" }}>
        <input
          type="text"
          name="email"
          placeholder="email"
          autoComplete="on"
          value={email}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
          onKeyPress={this.handleKeyPress}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="on"
          value={password}
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
          onKeyPress={this.handleKeyPress}
        />
        <ButtonLarge onClick={this.signIn}>Sign In</ButtonLarge>
        <ButtonLarge onClick={this.signUp}>Sign Up</ButtonLarge>
        <Logs />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetUserInfos: payload => {
      dispatch(setUserInfos(payload));
    },
    dispatchSetUid: payload => {
      dispatch(setUid(payload));
    },
    dispatchSetIsAuth: payload => {
      dispatch(setIsAuth(payload));
    },
    dispatchSetIsAdmin: payload => {
      dispatch(setIsAdmin(payload));
    },
    dispatchCallGetStories: () => {
      dispatch({ type: CALL_GET_ALL_STORIES });
    },
    dispatchCallListenUsers: () => {
      dispatch({ type: CALL_LISTEN_STORY_USERS });
    },
    dispatchCallPrintError: payload => {
      dispatch({ type: CALL_PRINT_ERROR, payload });
    },
    dispatchSetAllCharacters: payload => {
      dispatch(setAllCharacters(payload));
    },
  };
};

IsNotAuth.propTypes = {
  dispatchSetUserInfos: PropTypes.func.isRequired,
  dispatchSetUid: PropTypes.func.isRequired,
  dispatchSetIsAuth: PropTypes.func.isRequired,
  dispatchSetIsAdmin: PropTypes.func.isRequired,
  dispatchCallGetStories: PropTypes.func.isRequired,
  dispatchCallListenUsers: PropTypes.func.isRequired,
  dispatchCallPrintError: PropTypes.func.isRequired,
  dispatchSetAllCharacters: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(IsNotAuth);

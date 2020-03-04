import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase";
import Logs from "./Logs";
import { defaultState } from "../Utils/Constants";
import {
  setAllCharacters,
  setUid,
  setUserInfos,
} from "../../redux/actions/actionsUserInfos";
import { setIsAuth, setIsAdmin } from "../../redux/actions/actionsAppState";
import {
  CALL_GET_ALL_STORIES,
  CALL_PRINT_ERROR,
} from "../../redux/actionsTypes/actionsTypesAppState";
import { Button } from "semantic-ui-react";
import { cursorPointer } from "../Utils/StyleConstants";

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
      dispatchSetUserInfos,
      dispatchSetIsAuth,
      dispatchSetIsAdmin,
      dispatchCallGetStories,
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
      <div
        style={{
          height: "100%",
          display: "flex",
        }}
      >
        <h1
          style={{
            position: "absolute",
            width: "100%",
            top: 30,
            display: "flex",
            justifyContent: "center",
            letterSpacing: 13,
          }}
        >
          RPG PLAYER
        </h1>
        <div style={{ width: "50%", height: "100%" }}>
          <img
            src={"./common/homepage.jpg"}
            alt={"homepage"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingTop: 70,
            paddingBottom: 50,
            paddingLeft: 30,
          }}
        >
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                  style={{ minWidth: 200, marginBottom: 20 }}
                />
              </div>
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
                style={{ minWidth: 200, marginBottom: 20 }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Button.Group>
                <Button
                  onClick={this.signIn}
                  primary
                  style={{ width: 120, cursor: cursorPointer }}
                >
                  Sign In
                </Button>
                <Button.Or />
                <Button
                  onClick={this.signUp}
                  positive
                  style={{ width: 120, cursor: cursorPointer }}
                >
                  Sign Up
                </Button>
              </Button.Group>
            </div>
          </div>
          <Logs />
        </div>
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
  dispatchCallPrintError: PropTypes.func.isRequired,
  dispatchSetAllCharacters: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(IsNotAuth);

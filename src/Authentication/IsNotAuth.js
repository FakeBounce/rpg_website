import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import ButtonLarge from '../Utils/ButtonLarge';
import Logs from './Logs';

class IsNotAuth extends Component {
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.signIn();
    }
  };

  signIn = () => {
    const {
      email,
      password,
      triggerError,
      doSetState,
      loadUsers,
      loadStories,
    } = this.props;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .once('value')
          .then(snapshot => {
            doSetState(
              {
                ...snapshot.val(),
                isAuth: true,
                uid: firebase.auth().currentUser.uid,
              },
              () => {
                loadUsers();
                loadStories();
              }
            );
          });
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  signUp = () => {
    const {
      email,
      password,
      doSetState,
      triggerError,
      loadUsers,
      loadStories,
    } = this.props;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref('users/' + firebase.auth().currentUser.uid)
          .set({
            photoUrl: firebase.auth().currentUser.photoURL,
            name: firebase.auth().currentUser.displayName,
          })
          .catch(error => {
            triggerError(error);
          });
        doSetState({
          isAuth: true,
          uid: firebase.auth().currentUser.uid,
        });
        loadUsers();
        loadStories();
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  render() {
    const { email, password, onChange } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <input
          type="text"
          name="email"
          placeholder="email"
          autoComplete="on"
          value={email}
          onChange={e => {
            onChange(e.target.name, e.target.value);
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
            onChange(e.target.name, e.target.value);
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

IsNotAuth.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadStories: PropTypes.func.isRequired,
};

export default IsNotAuth;

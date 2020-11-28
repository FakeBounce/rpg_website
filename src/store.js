// import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { createStore, compose, applyMiddleware } from 'redux';
import firebase from 'firebase';
import storage from 'redux-persist/es/storage';
import rootReducer from './redux/reducers/root';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { CALL_LISTEN_BESTIARY } from './redux/actionsTypes/actionsTypesBestiary';
import { CALL_LISTEN_CHARACTER } from './redux/actionsTypes/actionsTypesCharacter';
import {
  CALL_LISTEN_ALL_QUESTS,
  CALL_LISTEN_ALL_TOWNS,
  CALL_LISTEN_CURRENT_X,
  CALL_LISTEN_CURRENT_Y,
  CALL_LISTEN_MAP_TILES,
} from './redux/actionsTypes/actionsTypesMapInfos';
import { CALL_LISTEN_CHAT_HISTORY } from './redux/actionsTypes/actionsTypesChat';
import {
  CALL_LISTEN_MUSIC,
  CALL_LISTEN_NOISE,
  CALL_LISTEN_SONG,
} from './redux/actionsTypes/actionsTypesSounds';
import { CALL_LISTEN_MERCHANT_LIST } from './redux/actionsTypes/actionsTypesMerchants';
import { CALL_GET_ITEM_LIST } from './redux/actionsTypes/actionsTypesItems';
import {
  CALL_LISTEN_CURRENT_EVENT,
  CALL_LISTEN_EVENTS_HISTORY,
} from './redux/actionsTypes/actionsTypesEvents';
import {
  SET_GAME_MASTER,
  SET_APP_VERSION,
  CALL_SIGN_OUT,
} from './redux/actionsTypes/actionsTypesAppState';
import { CALL_LISTEN_TEAM_CHARACTERS } from './redux/actionsTypes/actionsTypesTeam';
import { CALL_GET_ALL_USER_CHARACTERS } from './redux/actionsTypes/actionsTypesUserInfos';

// Env
// const { PERSIST_ENABLED, PERSIST_PURGE } = Config;

const config = {
  apiKey: 'AIzaSyA7Uk2daoLGmxUlJp07uEvXu826Q3_uXdc',
  authDomain: 'rpgwebsite-8a535.firebaseapp.com',
  databaseURL: 'https://rpgwebsite-8a535.firebaseio.com/',
  storageBucket: 'gs://rpgwebsite-8a535.appspot.com',
};
firebase.initializeApp(config);

const sagaMiddleware = createSagaMiddleware();

const enhancerList = [];
let composedEnhancer = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

const middlewares = [sagaMiddleware];
// const middlewares = [sagaMiddleware, navMiddleware];

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

composedEnhancer = compose(
  f => f,
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({})
    : f => f,
);

const reducersConfig = {
  key: 'primary',
  storage,
};

const reducer =
  // PERSIST_PURGE === "true"
  //   ? combineReducers(rootReducer)
  //   : persistCombineReducers(reducersConfig, rootReducer);
  persistCombineReducers(reducersConfig, rootReducer);

function configureStore() {
  const store = createStore(reducer, {}, composedEnhancer);

  firebase
    .database()
    .ref('/version')
    .once('value')
    .then(snapshot => {
      // if (PERSIST_ENABLED === "true") {

      persistStore(store, null, () => {
        if (
          store.getState().appState.currentStory !== '' &&
          store.getState().appState.version === snapshot.val()
        ) {
          const currentStory = store.getState().appState.currentStory;
          const uid = store.getState().userInfos.uid;
          if (
            typeof store.getState().appState.stories[currentStory]
              .characters !== 'undefined' &&
            typeof store.getState().appState.stories[currentStory].characters[
              uid
            ] !== 'undefined'
          ) {
            store.dispatch({ type: CALL_GET_ITEM_LIST });
          }
          store.dispatch({ type: CALL_LISTEN_CHARACTER });
          store.dispatch({
            type: SET_GAME_MASTER,
            payload: store.getState().appState.stories[currentStory].gameMaster,
          });
          store.dispatch({ type: CALL_LISTEN_MAP_TILES });
          store.dispatch({ type: CALL_LISTEN_BESTIARY });
          store.dispatch({ type: CALL_LISTEN_CHAT_HISTORY });
          store.dispatch({ type: CALL_LISTEN_MUSIC });
          store.dispatch({ type: CALL_LISTEN_NOISE });
          store.dispatch({ type: CALL_LISTEN_SONG });
          store.dispatch({ type: CALL_LISTEN_MERCHANT_LIST });
          store.dispatch({ type: CALL_LISTEN_ALL_TOWNS });
          store.dispatch({ type: CALL_LISTEN_ALL_QUESTS });
          store.dispatch({ type: CALL_LISTEN_CURRENT_X });
          store.dispatch({ type: CALL_LISTEN_CURRENT_Y });
          store.dispatch({ type: CALL_LISTEN_CURRENT_EVENT });
          store.dispatch({ type: CALL_LISTEN_EVENTS_HISTORY });
          store.dispatch({ type: CALL_LISTEN_TEAM_CHARACTERS });
          store.dispatch({ type: CALL_GET_ALL_USER_CHARACTERS });
        } else {
          store.dispatch({ type: CALL_SIGN_OUT });
        }
        store.dispatch({ type: SET_APP_VERSION, payload: snapshot.val() });
      });

      // }
    })
    .catch(error => {
      console.log('error', error);
      return error;
      // this.triggerError(error);
    });

  return store;
}

export { configureStore, sagaMiddleware };

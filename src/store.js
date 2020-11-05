// import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { createStore, compose, applyMiddleware } from 'redux';
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
import { SET_GAME_MASTER } from './redux/actionsTypes/actionsTypesAppState';
import { CALL_LISTEN_TEAM_CHARACTERS } from './redux/actionsTypes/actionsTypesTeam';
import { CALL_GET_ALL_USER_CHARACTERS } from './redux/actionsTypes/actionsTypesUserInfos';

// Env
// const { PERSIST_ENABLED, PERSIST_PURGE } = Config;

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

  // if (PERSIST_ENABLED === "true") {
  persistStore(store, null, () => {
    if (store.getState().appState.currentStory !== "") {
      const currentStory = store.getState().appState.currentStory;
      const uid = store.getState().userInfos.uid;
      if (
        typeof store.getState().appState.stories[currentStory].characters !==
          'undefined' &&
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
    }
  });
  // }
  return store;
}

export { configureStore, sagaMiddleware };

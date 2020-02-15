// import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { createStore, compose, applyMiddleware } from "redux";
import storage from "redux-persist/es/storage";
import rootReducer from "./redux/reducers/root";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistCombineReducers } from "redux-persist";

// Env
// const { PERSIST_ENABLED, PERSIST_PURGE } = Config;

const sagaMiddleware = createSagaMiddleware();

const enhancerList = [];
let composedEnhancer = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

const middlewares = [sagaMiddleware];
// const middlewares = [sagaMiddleware, navMiddleware];

if (typeof devToolsExtension === "function") {
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
  key: "primary",
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
  // persistStore(store, null, () => {
  //   console.log('store.getState()', store.getState());
  // });
  // }
  return store;
}

export { configureStore, sagaMiddleware };

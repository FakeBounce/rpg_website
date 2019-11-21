import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase";

import App from "./App";
import { unregister } from "./registerServiceWorker";
import sagasRoot from "./redux/sagas/sagasRoot";
import { sagaMiddleware, configureStore } from "./store";

const store = configureStore();
sagaMiddleware.run(sagasRoot);

const config = {
  apiKey: "AIzaSyA7Uk2daoLGmxUlJp07uEvXu826Q3_uXdc",
  authDomain: "rpgwebsite-8a535.firebaseapp.com",
  databaseURL: "https://rpgwebsite-8a535.firebaseio.com/",
  storageBucket: "gs://rpgwebsite-8a535.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
unregister();

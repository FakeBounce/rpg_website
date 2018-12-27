import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";
import App from './App';
import { unregister } from "./registerServiceWorker";

var config = {
    apiKey: "AIzaSyA7Uk2daoLGmxUlJp07uEvXu826Q3_uXdc",
    authDomain: "rpgwebsite-8a535.firebaseapp.com",
    databaseURL: "https://rpgwebsite-8a535.firebaseio.com/",
    storageBucket: "gs://rpgwebsite-8a535.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { WindowProvider } from './contexts/windowContext';
import { StyleProvider } from './contexts/styleContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import { unregister } from './registerServiceWorker';
import sagasRoot from './redux/sagas/sagasRoot';
import { sagaMiddleware, configureStore } from './store';
import StoryPreview from './StoryPreview';

const store = configureStore();
sagaMiddleware.run(sagasRoot);

const config = {
  apiKey: 'AIzaSyA7Uk2daoLGmxUlJp07uEvXu826Q3_uXdc',
  authDomain: 'rpgwebsite-8a535.firebaseapp.com',
  databaseURL: 'https://rpgwebsite-8a535.firebaseio.com/',
  storageBucket: 'gs://rpgwebsite-8a535.appspot.com',
};
firebase.initializeApp(config);
window.soundManager.setup({ debugMode: false });

ReactDOM.render(
  <Provider store={store}>
    <WindowProvider>
      <StyleProvider>
        <Router>
          <Switch>
            <Route exact path='/preview/:story'>
              <StoryPreview />
            </Route>
            <Route path='/'>
              <App />
            </Route>
          </Switch>
        </Router>
      </StyleProvider>
    </WindowProvider>
  </Provider>,
  document.getElementById('root'),
);
unregister();

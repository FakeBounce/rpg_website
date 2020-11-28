import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { WindowProvider } from './contexts/windowContext';
import { StyleProvider } from './contexts/styleContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import { unregister } from './registerServiceWorker';
import sagasRoot from './redux/sagas/sagasRoot';
import { sagaMiddleware, configureStore } from './store';
import StoryPreview from './StoryPreview';
import { MapGeneratorProvider } from './contexts/mapGeneratorContext';

const store = configureStore();
sagaMiddleware.run(sagasRoot);
window.soundManager.setup({ debugMode: false });

ReactDOM.render(
  <Provider store={store}>
    <WindowProvider>
      <StyleProvider>
        <MapGeneratorProvider store={store}>
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
        </MapGeneratorProvider>
      </StyleProvider>
    </WindowProvider>
  </Provider>,
  document.getElementById('root'),
);
unregister();

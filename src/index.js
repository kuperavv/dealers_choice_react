import React from 'react';
import ReactDOM from 'react-dom';
import App from '../client/Main_Redux';
import { Provider } from 'react-redux';
import store from '../client/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

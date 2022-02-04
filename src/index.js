import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { Provider } from 'react-redux';
import store from './redux/store';

// global stylesheet
import './style/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

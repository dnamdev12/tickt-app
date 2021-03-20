import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import '../src/assets/scss/common.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux/rootReducer'
import rootSaga from './redux/rootSaga';
import Loader from './common/loader';
import Toast from './common/toast';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
))

//run the saga
sagaMiddleware.run(rootSaga)

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Loader />
      <Toast />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

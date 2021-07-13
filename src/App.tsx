import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import Loader from './common/loader';
import Toast from './common/toast';

import React, { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useClearCache } from 'react-clear-cache';


import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
console.log({
  firebaseConfig
})
const myApp = firebase.initializeApp(firebaseConfig);
const auth = myApp.auth();
// These imports load individual services into the firebase namespace.

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
))

//run the saga
sagaMiddleware.run(rootSaga)

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  useEffect(() => {
    AOS.init({
      duration: 2000
    });

    if (!isLatestVersion) {
      emptyCacheStorage();
    }
  }, []);

  useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage();
    }

  }, [isLatestVersion])

  return (
    <Provider store={store}>
      <Routes />
      <Loader />
      <Toast />
    </Provider>
  );
}

export {
  auth,
  store
}
export default App;

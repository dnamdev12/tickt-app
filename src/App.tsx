import Routes from "./routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./redux/rootReducer";
import rootSaga from "./redux/rootSaga";
import Loader from "./common/loader";
import Toast from "./common/toast";

import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { useClearCache } from "react-clear-cache";

import { requestPermission, deleteToken, onMessageListner } from "./firebase.js";
import { setShowToast } from "./redux/common/actions";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

//run the saga
sagaMiddleware.run(rootSaga);

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  const notificationLoader = () => {
    // const messaging: any = firebase.messaging();
    // messaging
    //   .requestPermission()
    //   .then(() => {
    //     return messaging.getToken();
    //   })
    //   .then((token: any) => {
    //     console.warn("token", token);
    //   })
    //   .catch((err: any) => {
    //     console.log("notification permission denied inside app.tsx", err);
    //   });

    // await getToken().then((firebaseToken: any) => {
    //   console.log(firebaseToken, "firebaseToken");
    // });
    // getToken()
    //   .then((currentToken: string) => {
    //     storageService.setItem("FCM token", currentToken);
    //   })

    onMessageListner()
      .then((payload: any) => {
        setShowToast(true, payload.notification.title);
        console.log('payload.notification.title: ', payload.notification.title);
      })
  };

  useEffect(() => {
    notificationLoader();
    requestPermission();

    AOS.init({
      duration: 2000,
    });

    if (!isLatestVersion) {
      emptyCacheStorage();
    }
  }, []);

  useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage();
    }
  }, [isLatestVersion]);

  return (
    <Provider store={store}>
      <Routes />
      <Loader />
      <Toast />
    </Provider>
  );
};

export default App;

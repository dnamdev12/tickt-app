import Routes from "./routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./redux/rootReducer";
import rootSaga from "./redux/rootSaga";
import Loader from "./common/loader";
import Toast from "./common/toast";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { useClearCache } from "react-clear-cache";

import { requestPermission } from "./firebase.js";
import CustomNotification from "./common/customNotification";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
))

//run the saga
sagaMiddleware.run(rootSaga);

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  useEffect(() => {
    requestPermission();
    // onMessageListner();

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
      {/* <CustomNotification /> */}
    </Provider>
  );
};

export {
  store
}
export default App;

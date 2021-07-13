import firebase from "firebase/app";
import "firebase/messaging";
import 'firebase/auth';
import 'firebase/database';

import storageService from "./utils/storageService";
import {
    setShowToast
} from "./redux/common/actions";

export const firebaseConfig = {
    apiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    authDomain: "tickt-app.firebaseapp.com",
    databaseURL: "https://tickt-app.firebaseapp.com",
    projectId: "tickt-app",
    storageBucket: "tickt-app.appspot.com",
    messagingSenderId: "795502342919",
    appId: "1:795502342919:web:37a2294b55f69051d30ba2",
    measurementId: "G-KT3LTB6JMT"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const messaging = firebase.messaging();

const getRegisterToken = () => {
    messaging.getToken({
        vapidKey: 'BHtgSVj0gw6YQDd6ByTPx_gyRtBWKlHBVYKFsemnv1t6bTH9efAseLWaoJx2GvTu0NW314ZF4DOj_eJ7tub9kHI'
    }).then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            storageService.setItem('FCM token', currentToken);
            console.log("FCM token fetched successsfully", currentToken);
            saveToken(currentToken);
            sendTokenToServer(currentToken);
        } else {
            console.log('No registration token available.');
            setTokenSentToServer(false);
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        setTokenSentToServer(false);
    });
}

const isTokenSentToServer = () => {
    return storageService.getItem('sentToServer') === '1';
}

const setTokenSentToServer = (sent) => {
    storageService.setItem('sentToServer', sent ? '1' : '0');
}

const sendTokenToServer = () => {
    if (!isTokenSentToServer) {
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again unless it changes');
    }
}

const saveToken = () => {
    //saveing token to database
}

export function requestPermission() {
    Notification.requestPermission().then((permission) => {
            console.log('Notification permission granted.');
            if (permission === 'granted' && isTokenSentToServer()) {
                console.log('Token Already sent');
            } else if (!isTokenSentToServer()) {
                getRegisterToken();
            }
        })
        .catch((err) => {
            console.log('Unable to get permission to show notification : ', err);
        });
}

export const onMessageListner = () => {
    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
        console.log('firebase notification received event: ', payload);
        const title = payload.notification.title;
        const options = {
            body: payload.notification.body,
            icon: '/firebase-logo.png',
            data: {
                time: new Date(Date.now()).toString,
                action_click: payload.data.action_click
            }
        };
        // browser default notification
        var myNotifications = new Notification(title, options);
        // custom notification
        // setShowToast(true, title);
    })
}

window.self.addEventListener("notificationclick", (event) => {
    console.log(event);
    var action_click = event.notification.data.action_click
    event.notification.close();
    event.waitUntil(
        window.open(action_click)
        // clients.openWindow(action_click)
    )
})

export function deleteToken() {
    const messaging = firebase.messaging();

    messaging.deleteToken().then(() => {
        console.log('Token deleted.');
        // ...
    }).catch((err) => {
        console.log('Unable to delete token. ', err);
    });
}

export {
  auth
}

export default firebase;
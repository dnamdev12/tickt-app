import firebase from "firebase/app";
import "firebase/messaging";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import storageService from "./utils/storageService";

let firebaseConfig = {
    apiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    authDomain: "tickt-app.firebaseapp.com",
    databaseURL: "https://tickt-app.firebaseapp.com",
    projectId: "tickt-app",
    storageBucket: "tickt-app.appspot.com",
    messagingSenderId: "795502342919",
    appId: "1:795502342919:web:37a2294b55f69051d30ba2",
    measurementId: "G-KT3LTB6JMT"
};

if (localStorage.getItem('userType') == 2) {
    firebaseConfig = {
        apiKey: "AIzaSyDZVqTtKXaXgshCPPfKW70GFruj_1ATijQ",
        authDomain: "tickt-web-7c921.firebaseapp.com",
        projectId: "tickt-web-7c921",
        storageBucket: "tickt-web-7c921.appspot.com",
        messagingSenderId: "416293177899",
        appId: "1:416293177899:web:566e39bc9e09614629b86e",
        measurementId: "G-7RGDZDX6EH"
    }
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const messaging = firebase.messaging();
var db = firebase.firestore();


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
    auth,
    messaging,
    db,
    firebaseConfig
}

export default firebase;
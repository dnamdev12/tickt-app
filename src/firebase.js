import firebase from "firebase/app";
import "firebase/messaging";

import storageService from "./utils/storageService";

const firebaseConfig = {
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

const messaging = firebase.messaging();

// export const getToken = () => {
const getRegisterToken = () => {
    // return new Promise((resolve, reject) => {
    //     messaging.getToken({
    //             vapidKey: "BHtgSVj0gw6YQDd6ByTPx_gyRtBWKlHBVYKFsemnv1t6bTH9efAseLWaoJx2GvTu0NW314ZF4DOj_eJ7tub9kHI"
    //         })
    //         .then((currentToken) => {
    //             if (currentToken) {
    //                 console.log("current token for client : ", currentToken);
    //                 resolve(currentToken);
    //             } else {
    //                 alert('please enable notification permission');
    //                 return undefined;
    //             }
    //         })
    //         .catch((err) => {
    //             alert('please enable notification permission');
    //             console.log("An error occured while retrieving token : ", err);
    //             reject(err);
    //         })
    // });

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
            console.log('No registration token available. Show permission request UI');
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
            if (isTokenSentToServer()) {
                console.log('Token Already sent');
            } else {
                getRegisterToken();
            }
        })
        .catch((err) => {
            console.log('Unable to get permission to notify. error :', err);
        });
}

messaging.onMessage((payload) => {
    console.log('firebase notification received: ', payload);
    const title = payload.data.title;
    const options = {
        body: payload.data.body,
        icon: '/firebase-logo.png',
    };
    var myNotifications = new Notification(title, options);
})

export const onMessageListner = () => {
    const messaging = firebase.messaging();

    return new Promise((resolve) => {
        messaging.onMessage((payload) => {
            console.log('firebase notification received: ', payload);
            const title = payload.data.title;
            const options = {
                body: payload.data.body,
                icon: '/firebase-logo.png',
                // data: {
                //     time: new Date(Date.now()).toString,
                //     action_click: payload.data.action_click
                // }
            };
            var myNotifications = new Notification(title, options);
            resolve(payload);
        })
    })
}

// eslint-disable-next-line no-restricted-globals
window.self.addEventListener("notificationClick", (event) => {
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


export default firebase;
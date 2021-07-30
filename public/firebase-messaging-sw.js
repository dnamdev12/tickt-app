// Give the service worker access to Firebase Messaging.
import firebase from "firebase/app";
import "firebase/messaging";
// import { devFirebaseConfig, qaStgFirebaseConfig } from '../src/utils/globalConfig';
import { onNotificationClick } from '../src/utils/common';

var self = this;

const devFirebaseConfig = {
    apiKey: "AIzaSyDq9WSnxFSvLIkzb5ucqQdDdh6zFUicGUE",
    authDomain: "tickt-test.firebaseapp.com",
    databaseURL: "https://tickt-test-default-rtdb.firebaseio.com",
    projectId: "tickt-test",
    storageBucket: "tickt-test.appspot.com",
    messagingSenderId: "268252142860",
    appId: "1:268252142860:web:b62a9d4bd768f127237d29"
};

const qaStgFirebaseConfig = {
    apiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    authDomain: "tickt-app.firebaseapp.com",
    databaseURL: "https://tickt-app-default-rtdb.firebaseio.com",
    projectId: "tickt-app",
    storageBucket: "tickt-app.appspot.com",
    messagingSenderId: "795502342919",
    appId: "1:795502342919:web:37a2294b55f69051d30ba2",
    measurementId: "G-KT3LTB6JMT"
};

// firebase.initializeApp(process.env.NODE !== 'development' ? devFirebaseConfig : qaStgFirebaseConfig);
firebase.initializeApp(qaStgFirebaseConfig);
const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js', { scope: '/' })
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

messaging.onBackgroundMessage((payload) => {
    try {
        console.log("[firebase-messaging-sw.js] Received background message ", payload);
        var title = "Tickt App";
        var body = "Received new notification";
        var icon = '../src/assets/images/camera-black.png';
        var tag = 'simple-push-demo-notification-tag';
        var data = {
            doge: {
                wow: 'such amaze notification data'
            }
        };

        return self.registration.showNotification(title, {
            body: body,
            icon: icon,
            // tag: tag,
            data: data
        });
    }
    catch (e) {
        console.log("firebase message fetch error");
    }
});

self.addEventListener("notificationclick", (event) => {
    console.log("notificationclick made service worker");
    console.log(event.notification?.data?.doge, "dogeee111");
    console.log(event?.data?.doge, "dogeee222");
    // event.notification.close();
    event.waitUntil(
        // self.clients.openWindow('http://localhost:3000/active-jobs')
        self.clients.openWindow('https://ticktreactdev.appskeeper.in/active-jobs')
        // self.clients.openWindow(onNotificationClick(event.notification.data))
    )
    // Get all the Window clients
    // event.waitUntil(self.clients.matchAll({ type: 'window' }).then(clientsArr => {
    // If a Window tab matching the targeted URL already exists, focus that;
    // const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === event.notification.data.click_action ? (windowClient.focus(), true) : false);
    // Otherwise, open a new tab to the applicable URL and focus it.
    // if (!hadWindowToFocus) self.clients.openWindow(event.notification.data.click_action).then(windowClient => windowClient ? windowClient.focus() : null);
    // }));
})

self.addEventListener("notificationclose", (event) => {
    event.notification.close();
    console.log('notification close');
})
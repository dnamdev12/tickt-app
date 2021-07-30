// Give the service worker access to Firebase Messaging.
import firebase from "firebase/app";
import "firebase/messaging";
import { devFirebaseConfig, qaStgFirebaseConfig } from '../src/utils/globalConfig';

var self = this;

// firebase.initializeApp(process.env.NODE !== 'development' ? devFirebaseConfig : qaStgFirebaseConfig);
firebase.initializeApp(qaStgFirebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification type here => notification/data
    const title = payload?.notification?.title;
    const options = {
        body: payload?.notification?.body,
    };
    return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
    console.log(event);
    // var click_action = event.notification.data.click_action
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow('http://localhost:3000/active-jobs')
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
    console.log('notification close');
})
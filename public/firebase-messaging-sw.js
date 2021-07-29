// Give the service worker access to Firebase Messaging.
import firebase from "firebase/app";
import "firebase/messaging";
import { devFirebaseConfig, qaStgFirebaseConfig } from '../src/utils/globalConfig';
import { onNotificationClick } from '../src/utils/common';

var self = this;

// firebase.initializeApp(process.env.NODE !== 'development' ? devFirebaseConfig : qaStgFirebaseConfig);
firebase.initializeApp(qaStgFirebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    try {
        console.log("[firebase-messaging-sw.js] Received background message ", payload);
        var title = payload.notification.title;
        var body = payload.notification.body;
        var icon = '../src/assets/images/camera-black.png';
        var tag = 'simple-push-demo-notification-tag';
        var data = {
            doge: {
                wow: 'such amaze notification data'
                }
            };


        return self.registration.showNotification(title, {
            body: body,
            // icon: icon,
            // tag: tag,
            // data: data
          });
    }
    catch (e) {
        console.log("firebase message fetch error");
    }
});

    self.addEventListener("notificationclick", (event) => {
        console.log("notificationclick made service worker");
        // event.notification.close();
        event.waitUntil(
            self.clients.openWindow('http://localhost:3000/active-jobs')
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
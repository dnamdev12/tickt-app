// Give the service worker access to Firebase Messaging.
import firebase from "firebase/app";
import "firebase/messaging";

var self = this;

const firebaseConfig = {
    apiKey: "AIzaSyDKFFrKp0D_5gBsA_oztQUhrrgpKnUpyPo",
    authDomain: "tickt-app.firebaseapp.com",
    projectId: "tickt-app",
    storageBucket: "tickt-app.appspot.com",
    messagingSenderId: "795502342919",
    appId: "1:795502342919:web:37a2294b55f69051d30ba2",
    measurementId: "G-KT3LTB6JMT"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
        data: {
            time: new Date(Date.now()).toString(),
            click_action: payload.data.click_action
        }
    };
   return self.registration.showNotification(title, options);
});

    self.addEventListener("notificationclick", (event) => {
    console.log(event);
    var click_action = event.notification.data.click_action
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow('https://ticktreactdev.appskeeper.in/active-jobs')
    )
    // Get all the Window clients
    // event.waitUntil(self.clients.matchAll({ type: 'window' }).then(clientsArr => {
    // If a Window tab matching the targeted URL already exists, focus that;
    // const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === event.notification.data.click_action ? (windowClient.focus(), true) : false);
    // Otherwise, open a new tab to the applicable URL and focus it.
    // if (!hadWindowToFocus) self.clients.openWindow(event.notification.data.click_action).then(windowClient => windowClient ? windowClient.focus() : null);
//   }));
})

    self.addEventListener("notificationclose", (event) => {
    console.log('notification close');
})
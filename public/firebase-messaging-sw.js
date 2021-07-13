// Give the service worker access to Firebase Messaging.
import firebase from "firebase/app";
import "firebase/messaging";

// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

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
            time: new Date(Date.now()).toString,
            action_click: payload.data.action_click
        }
    };

    window.self.registration.showNotification(title, options);
});

window.self.addEventListener("notificationclick", (event) => {
    console.log(event);
    var action_click = event.notification.data.action_click
    event.notification.close();
    event.waitUntil(
        window.open(action_click)
    )
})

window.self.addEventListener("notificationclose", (event) => {
    console.log('notification close');
})
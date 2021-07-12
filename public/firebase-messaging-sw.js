// import firebase from "firebase/app";
// import "firebase/messaging";

// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

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

// messaging.setBackgroundMessageHandler((payload) => {
messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const title = "Background Message Title";
    const options = {
        body: "Background Message body.",
        icon: '/firebase-logo.png'
    };

     return self.registration.showNotification(title, options);
});

self.addEventListener("notificationClick", (event) => {
    console.log(event);
    var action_click = event.notification.data.action_click
    event.notification.close();
    event.waitUntil(
        window.open(action_click)
    )
})

self.addEventListener("notificationClose", (event) => {
    console.log('notification close');
})
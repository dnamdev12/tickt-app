import firebase from "firebase/app";
import "firebase/messaging";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import moment from 'moment';
import storageService from "../utils/storageService";

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const messaging = firebase.messaging();
var db = firebase.firestore();
const usersRef = db.collection('users');
// var db = firebase.database();


const getRegisterToken = () => {
    return new Promise((resolve, reject) => {
        messaging.getToken({
            vapidKey: 'BHtgSVj0gw6YQDd6ByTPx_gyRtBWKlHBVYKFsemnv1t6bTH9efAseLWaoJx2GvTu0NW314ZF4DOj_eJ7tub9kHI'
        }).then((currentToken) => {
            if (currentToken) {
                console.log("FCM token fetched successsfully", currentToken);
                sessionStorage.setItem("FCM token", currentToken);
                resolve({success: true, deviceToken: currentToken});
            } else {
                console.log('No registration token available.');
                setTokenSentToServer(false);
                resolve({success: false});
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            setTokenSentToServer(false);
            reject({success: false});
        });
    })
}

const setTokenSentToServer = (sent) => {
    storageService.setItem('sentToServer', sent ? '1' : '0');
}

const isTokenSentToServer = () => {
    return storageService.getItem('sentToServer') === '1';
}

export function requestPermission() {
    return new Promise((resolve, reject) => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted' && isTokenSentToServer()) {
                getRegisterToken();
                console.log('Token Already sent');
                resolve({success: false});
            } else if (permission === 'granted' && !isTokenSentToServer()) {
                const data = getRegisterToken();
                resolve(data);
            }
        })
            .catch((err) => {
                console.log('Unable to get permission to show notification : ', err);
                reject({success: false});
            });
    })
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

const firebaseSignUpWithEmailPassword = async ({ email, password, id, fullName, user_type }) => {
    try {
        let ref = await auth.createUserWithEmailAndPassword(email, password);
        if (ref) {
            await ref.user.updateProfile({
                displayName: fullName,
                // photoURL: '',
                // roleId: user_type,
             });
                
            await usersRef.doc(id).set({
                fullName: fullName,
                email: email,
                // uid: ref.user["$"]["W"],
                uid: id,
                photoURL: '',
                createdAt: moment().toDate(),
                roleId: user_type,
            });
            console.log("firebase authentication success")
        }
    } catch (err) {
        console.log("firebase authentication failure: ", { err });
    }
};

const firebaseLogInWithEmailPassword = async ({ email, password }) => {
    try {
        let response = await auth.signInWithEmailAndPassword(email, password);
        if (response) {
            console.log('firebase auth login success: ');
        }
    } catch (err) {
        console.log('firebase auth login failure: ');
    }
}

export {
    db,
    auth,
    messaging,
    firebase,
    firebaseConfig,
    firebaseSignUpWithEmailPassword,
    firebaseLogInWithEmailPassword
}

export default firebase;
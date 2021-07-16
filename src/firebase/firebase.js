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


const getRegisterToken = () => {
    return new Promise((resolve, reject) => {
        messaging.getToken({
            vapidKey: 'BHtgSVj0gw6YQDd6ByTPx_gyRtBWKlHBVYKFsemnv1t6bTH9efAseLWaoJx2GvTu0NW314ZF4DOj_eJ7tub9kHI'
        }).then((currentToken) => {
            if (currentToken) {
                console.log("FCM token fetched successsfully", currentToken);
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

const firebaseSignUpWithEmailPassword = async ({ email, password, id, role, fullName }) => {
    try {
        let ref = await auth().createUserWithEmailAndPassword(email, password);
        if (ref) {
            await ref.user.updateProfile({ displayName: fullName, });
            await db.collection("users").doc(id).set({
                email: email,
                refId: id,
                createdAt: moment().toDate(),
                roleId: role
            });
        }
    } catch (err) {
        // setShowToast(true, err.message);
        console.log({ err });
    }
};

const firebaseLogInWithEmailPassword = async ({ email, password }) => {
    try {
        let response = await auth().signInWithEmailAndPassword(email, password);
        if (response) {
            return { success: true, data: response.user }
        }
    } catch (err) {
        return { success: false, message: err.message }
    }
}

// firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

export {
    auth,
    messaging,
    db,
    firebaseConfig,
    firebase,
    firebaseSignUpWithEmailPassword,
    firebaseLogInWithEmailPassword
}

export default firebase;
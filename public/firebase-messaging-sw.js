importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// import firebase from "firebase/app";
// import "firebase/messaging";

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

firebase.initializeApp(qaStgFirebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    try {
        console.log("[firebase-messaging-sw.js] Received background message ", payload);
        var title = payload.data?.title;
        var body = payload.data?.notificationText;
        var data = { ...payload.data }

        return self.registration.showNotification(title, {
            // tag: tag,
            // icon: icon,
            body: body,
            data: data
        });
    }
    catch (e) {
        console.log("firebase message fetch error");
    }
});

const onNotificationClick = (notification) => {
    let url = 'http://localhost:3000/';
    const { notificationType, user_type, extra_data, receiverId, senderId, jobId } = notification;
    switch (Number(notificationType)) {
        case 1: //TRADIE
            if (user_type == 1) {
                return `${url}tradie-info?tradeId=${receiverId}&type=1`;
            } else {
                return `${url}tradie-info?tradeId=${receiverId}&hideInvite=true`;
            }
        case 2: //BUILDER
            if (user_type == 1) {
                return `${url}builder-info?builderId=${receiverId}`;
            } else {
                return `${url}builder-info?builderId=${receiverId}&type=2`;
            }
        case 3: //JOB
            if (user_type == 1) {
                return `${url}job-details-page?jobId=${jobId}&redirect_from=jobs&isActive=on`;
            } else {
                let urlEncode = window.btoa(`?jobId=${jobId}&status=${extra_data?.status}&tradieId=${senderId}&edit=true&activeType=active`)
                return `${url}job-detail?${urlEncode}`;
            }
        case 4: //PAYMENT
            return `${url}payment-history`;
        case 5: //DISPUTES
            if (user_type == 1) {
                return `${url}job-details-page?jobId=${jobId}&redirect_from=jobs&isActive=on`;
            } else {
                let urlEncode = window.btoa(`?jobId=${jobId}&status=${extra_data?.status}&tradieId=${senderId}&edit=true&activeType=active`)
                return `${url}job-detail?${urlEncode}`;
            }
        // case 6: //REVIEW_TRADIE
        case 7: //REVIEW_TRADIE
            return `${url}past-jobs`;
        case 8: //REVIEW_BUILDER
            return `${url}jobs?active=past`;
        case 9: //QUESTION
            if (user_type == 1) {
                return `${url}job-details-page?jobId=${jobId}&tradeId=${extra_data?.tradeId}&specializationId=${extra_data?.specializationId}`;
            } else {
                let urlEncode = window.btoa(`?jobId=${jobId}&status=open`)
                return `${url}job-detail?${urlEncode}`;
            }
        case 10: //REVIEW
            if (user_type == 1) {
                return `${url}builder-info?builderId=${receiverId}`;
            } else {
                return `${url}tradie-info?tradeId=${receiverId}&hideInvite=true`;
            }
        case 11: //TERM_AND_CONDITION
            return `${url}update-user-info`;
        case 12: //JOB_DASHBOARD
            if (user_type == 1) {
                return `${url}active-jobs`;
            } else {
                return `${url}jobs?active=active`;
            }
        case 13: //BLOCK_ACCOUNT
            return `${url}`;
        case 14: //MARK_MILESTONE
            if (user_type == 1) {
                return `${url}mark-milestone?jobId=${jobId}&redirect_from=jobs`;
            } else {
                return `${url}jobs?active=active`;
            }
        case 15: //JOB_HOMEPAGE
            if (user_type == 1) {
                return `${url}job-details-page?jobId=${jobId}&tradeId=${extra_data?.tradeId}&specializationId=${extra_data?.specializationId}`;
            } else {
                return `/`;
            }
        case 16: //TRADIE
            if (user_type == 1) {
                return `${url}tradie-info?tradeId=${receiverId}&type=1`;
            } else {
                return `${url}tradie-info?tradeId=${receiverId}&hideInvite=true`;
            }
        default:
            return `${url}`;
    }
}

self.addEventListener("notificationclick", (event) => {
    console.log("notificationclick made service worker");
    // event.waitUntil(
        // self.clients.openWindow(onNotificationClick(event.notification?.data))
    // )
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(windowClients => {
            console.log('windowClients: ', windowClients);
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url == onNotificationClick(event.notification?.data) && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (self.clients.openWindow) {
                return self.clients.openWindow(onNotificationClick(event.notification?.data));
            }
        })
    );
    return self.clients.openWindow();
})

self.addEventListener("notificationclose", (event) => {
    event.notification.close();
    console.log('notification close');
})
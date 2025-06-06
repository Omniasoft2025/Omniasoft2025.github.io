importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBG1XuO_J_Mj_r1yTUhmjm6jehyYER0DzQ",
  authDomain: "test-3772b.firebaseapp.com",
  projectId: "test-3772b",
  storageBucket: "test-3772b.firebasestorage.app",
  messagingSenderId: "903310208317",
  appId: "1:903310208317:web:03f70e570cb6f789642954"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: {
      url: payload.fcmOptions?.link || "https://omniasoft.it"
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data?.url || "https://omniasoft.it";
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});

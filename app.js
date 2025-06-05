import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBG1XuO_J_Mj_r1yTUhmjm6jehyYER0DzQ",
  authDomain: "test-3772b.firebaseapp.com",
  projectId: "test-3772b",
  storageBucket: "test-3772b.firebasestorage.app",
  messagingSenderId: "903310208317",
  appId: "1:903310208317:web:03f70e570cb6f789642954",
  measurementId: "G-04N92CK01Q"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("🔔 Notifiche consentite");
    getToken(messaging, {
      vapidKey: "BJdhliakBaY9byl_fKV_SWu9L9tOvWt0_pw_UL6ffOTxBVgW2R2lAOSG4iDXQQUI_z7L891T3YTwZOUfW7sWTpE"
    }).then(currentToken => {
      if (currentToken) {
        console.log("✅ Token ricevuto:", currentToken);
      } else {
        console.warn("⚠️ Nessun token disponibile.");
      }
    }).catch(err => {
      console.error("❌ Errore getToken:", err);
    });
  } else {
    console.warn("⚠️ Permesso notifiche negato");
  }
});

onMessage(messaging, payload => {
  console.log("📩 Messaggio ricevuto in foreground:", payload);
});

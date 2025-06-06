import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const status = document.getElementById("status");
function log(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  document.body.appendChild(p);
  console.log(msg);
}

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
const db = getFirestore(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((reg) => {
      log("✅ Service Worker registrato.");
    })
    .catch((err) => {
      log("❌ Errore SW: " + err.message);
    });
} else {
  log("❌ Service Worker non supportato.");
}

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    log("✅ Notifiche autorizzate.");
    getToken(messaging, {
      vapidKey: "BJdhliakBaY9byl_fKV_SWu9L9tOvWt0_pw_UL6ffOTxBVgW2R2lAOSG4iDXQQUI_z7L891T3YTwZOUfW7sWTpE"
    }).then((currentToken) => {
      if (currentToken) {
        log("📲 Token: " + currentToken);
        addDoc(collection(db, "tokens"), {
          token: currentToken,
          timestamp: new Date()
        }).then(() => {
          log("✅ Token salvato in Firestore.");
        }).catch((e) => {
          log("❌ Errore Firestore: " + e.message);
        });
      } else {
        log("⚠️ Nessun token ricevuto.");
      }
    }).catch(err => {
      log("❌ Errore getToken: " + err.message);
    });
  } else {
    log("🔕 Notifiche bloccate.");
  }
});
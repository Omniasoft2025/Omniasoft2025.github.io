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

// Mostra info Service Worker
function showStatus(message, isError = false) {
  const p = document.createElement("p");
  p.textContent = message;
  p.style.fontSize = "14px";
  p.style.wordBreak = "break-word";
  p.style.padding = "10px";
  p.style.backgroundColor = isError ? "#ffd6d6" : "#d6ffd6";
  p.style.border = "1px solid #aaa";
  p.style.marginTop = "20px";
  document.body.appendChild(p);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((reg) => {
      showStatus("✅ Service Worker registrato correttamente.");
    })
    .catch((err) => {
      showStatus("❌ Errore registrazione Service Worker: " + err.message, true);
    });
} else {
  showStatus("❌ Il browser non supporta i Service Worker", true);
}

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, {
      vapidKey: "BJdhliakBaY9byl_fKV_SWu9L9tOvWt0_pw_UL6ffOTxBVgW2R2lAOSG4iDXQQUI_z7L891T3YTwZOUfW7sWTpE"
    }).then((currentToken) => {
      if (currentToken) {
        showStatus("📲 Token ricevuto: " + currentToken);
      } else {
        showStatus("⚠️ Nessun token disponibile.", true);
      }
    }).catch(err => {
      showStatus("❌ Errore ottenendo token: " + err.message, true);
      console.error(err);
    });
  } else {
    showStatus("🔕 Permesso notifiche negato", true);
  }
});

onMessage(messaging, (payload) => {
  console.log("📩 Notifica ricevuta in foreground:", payload);
});

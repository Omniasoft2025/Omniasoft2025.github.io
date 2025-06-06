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
    getToken(messaging, {
      vapidKey: "BJdhliakBaY9byl_fKV_SWu9L9tOvWt0_pw_UL6ffOTxBVgW2R2lAOSG4iDXQQUI_z7L891T3YTwZOUfW7sWTpE"
    }).then((currentToken) => {
      if (currentToken) {
        const p = document.createElement("p");
        p.textContent = "📲 Il tuo token: " + currentToken;
        p.style.fontSize = "12px";
        p.style.wordBreak = "break-word";
        p.style.padding = "10px";
        p.style.backgroundColor = "#f0f0f0";
        p.style.border = "1px solid #ccc";
        p.style.marginTop = "20px";
        document.body.appendChild(p);
      } else {
        alert("⚠️ Nessun token disponibile.");
      }
    }).catch(err => {
      alert("❌ Errore ottenendo token: " + err.message);
      console.error(err);
    });
  } else {
    alert("🔕 Permesso notifiche negato");
  }
});

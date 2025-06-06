import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging.js";

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
        console.log("✅ Token ricevuto:", currentToken);
        document.body.innerHTML += '<p>✅ Token salvato. Notifiche abilitate!</p>';

        // Invia token a Google Apps Script Web App
        fetch("https://script.google.com/macros/s/AKfycbx2pPwGEXaO8_LDHvbpeoUETxnu7sb9S8frFme55SSYiqw64QroVPofRi9tOlmz4IUz/exec", {
          method: "POST",
          body: JSON.stringify({ token: currentToken }),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        alert("⚠️ Nessun token disponibile.");
      }
    }).catch(err => {
      alert("❌ Errore ottenendo token: " + err.message);
    });
  } else {
    alert("🔕 Permesso notifiche negato");
  }
});

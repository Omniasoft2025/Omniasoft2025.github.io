import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    getToken(messaging, {
      vapidKey: "BJdhliakBaY9byl_fKV_SWu9L9tOvWt0_pw_UL6ffOTxBVgW2R2lAOSG4iDXQQUI_z7L891T3YTwZOUfW7sWTpE"
    }).then((currentToken) => {
      if (currentToken) {
        console.log("✅ Token:", currentToken);
        addDoc(collection(db, "tokens"), {
          token: currentToken,
          timestamp: new Date()
        }).then(() => {
          document.body.innerHTML += "<p>✅ Token salvato su Firestore.</p>";
        }).catch((e) => {
          console.error("❌ Errore salvataggio:", e);
        });
      } else {
        alert("⚠️ Nessun token disponibile.");
      }
    }).catch(err => {
      alert("❌ Errore getToken: " + err.message);
    });
  } else {
    alert("🔕 Permesso notifiche negato");
  }
});

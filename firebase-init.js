// ══════════════════════════════════════════════════════════
// firebase-init.js — ENTORNO DE DESARROLLO (Airtech-dev)
// ⚠️ NO usar en producción
// 
// 1. Crea proyecto en https://console.firebase.google.com
//    Nombre sugerido: airtec-dev-2026
// 2. Activa Firestore + Authentication (Email + Anónimo)
// 3. Copia las credenciales abajo
// ══════════════════════════════════════════════════════════

try {
  const cfg = {
    apiKey:            "PEGAR_API_KEY_DEV",
    authDomain:        "PEGAR_PROJECT_ID.firebaseapp.com",
    projectId:         "PEGAR_PROJECT_ID",
    storageBucket:     "PEGAR_PROJECT_ID.appspot.com",
    messagingSenderId: "PEGAR_SENDER_ID",
    appId:             "PEGAR_APP_ID"
  };
  const app  = firebase.initializeApp(cfg);
  const auth = firebase.auth();
  const db   = firebase.firestore();

  db.enablePersistence({ experimentalForceOwningTab: true })
    .then(() => console.log('✅ [DEV] Firestore persistence activo'))
    .catch(err => { if(err.code !== 'failed-precondition') console.warn(err); });

  auth.signInAnonymously().then(cred => {
    window.FB = {
      auth, db, uid: cred.user.uid,
      onSnapshot: (ref, cb) => ref.onSnapshot(cb),
      addDoc:     (ref, data) => ref.add(data),
      setDoc:     (ref, data, opts) => opts ? ref.set(data, opts) : ref.set(data),
      TASKS:   (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('tasks'),
      TECHS:   (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('techs'),
      REPORTS: (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('reports'),
      PLANS:   (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('plans'),
      HISTORY: (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('history'),
      DOCS:    (st) => db.collection(window.AIRLINE_ID||'arajet_dev').doc(st||'PUJ').collection('documents'),
    };
    console.log('✅ [DEV] Firebase listo — AIRLINE_ID: arajet_dev');
  }).catch(e => {
    document.getElementById('loader-err').style.display = 'block';
    document.getElementById('loader-err-msg').textContent = 'Error DEV: ' + e.message;
  });
} catch(e) {
  console.error('❌ [DEV] Firebase init error:', e);
}

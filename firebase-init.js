// ── Firebase Initialization & window.FB setup ──

  try {
    const cfg={
      apiKey:            "AIzaSyAOd612XuYZFZ8e9B1ZIYNZVP0CCJpfFl4",
      authDomain:        "airtec-dev-2026.firebaseapp.com",
      projectId:         "airtec-dev-2026",
      storageBucket:     "airtec-dev-2026.firebasestorage.app",
      messagingSenderId: "683128530653",
      appId:             "1:683128530653:web:cc599d69a56a0032039d34"
    };
    const app     = firebase.initializeApp(cfg);
    const auth    = firebase.auth();
    const db      = firebase.firestore();

    // ── Offline persistence: Firestore caches data in IndexedDB ──
    db.enablePersistence({experimentalForceOwningTab:true})
      .then(()=>console.log('✅ Firestore offline persistence activo'))
      .catch(err=>{
        if(err.code==='failed-precondition') console.warn('Múltiples pestañas abiertas — persistence solo en una');
        else if(err.code==='unimplemented') console.warn('Navegador no soporta persistence');
        else console.warn('Persistence error:',err);
      });

    window.FB = {
      auth,
      db,
      signInAnonymously : ()=>auth.signInAnonymously(),
      onAuthStateChanged: (a,cb)=>auth.onAuthStateChanged(cb),
      addDoc   : (col,data)=>col.add(data),
      setDoc   : (ref,data)=>ref.set(data,{merge:true}),
      updateDoc: (ref,data)=>ref.update(data),
      deleteDoc: (ref)=>ref.delete(),
      doc      : (db2,col,id,...rest)=>{
        // Flexible: doc(db, col, id) or doc(db, 'arajet_dev','PUJ','tasks','id')
        if(rest.length===0) return db2.collection(col).doc(id);
        // arajet / station / subcol / docid
        return db2.collection(col).doc(id).collection(rest[0]).doc(rest[1]);
      },
      onSnapshot: (col,cb)=>col.onSnapshot(snap=>cb(snap)),
      TASKS: (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("tasks"),
      TECHS: (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("techs"),
      HIST:  (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("history"),
      DOCS:    (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("documents"),
      REPORTS: (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("reports"),
      PLANS:   (st)=>db.collection('arajet_dev').doc(st||window._station||"PUJ").collection("plans"),
      TASKCATALOG: ()=>db.collection('arajet_dev').doc("config").collection("taskCatalog"),
      USERS: ()=>db.collection('arajet_dev').doc("config").collection("users"),
    };
    window.dispatchEvent(new Event("fb-ready"));
    console.log("✅ Firebase Compat inicializado correctamente");
  } catch(e){
    console.error("❌ Firebase init error:", e);
    document.getElementById('loader-err').style.display='block';
    document.getElementById('loader-spin').style.display='none';
    document.getElementById('loader-domain').textContent = window.location.hostname;
    document.getElementById('loader-err-msg').textContent = "Error al inicializar Firebase: " + e.message;
  }

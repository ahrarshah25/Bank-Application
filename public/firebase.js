(async function () {
  const BACKEND_URL = "https://bank-application-backend.vercel.app/api/firebase";

  const response = await fetch(BACKEND_URL);
  const config = await response.json();

  window.firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  });

  window.firebase.auth().setPersistence(
    window.firebase.auth.Auth.Persistence.LOCAL
  );

  console.log("🔥 Firebase Initialized Successfully");
})();   

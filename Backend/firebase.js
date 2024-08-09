import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://news-db-1ea0a-default-rtdb.firebaseio.com/"
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

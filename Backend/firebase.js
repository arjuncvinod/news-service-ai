import admin from 'firebase-admin';
// import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": "250588fac32d66e9ccd0c050bd9f3049ae040bf1",
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": "116327609661308084164",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jaq2q%40news-db-1ea0a.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://news-db-1ea0a-default-rtdb.firebaseio.com/"
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db, auth } from './firebase.js';

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/register', async (req, res) => {
//   const { email, password, role } = req.body;

//   // Validate input fields
//   if (!email || !password || !role) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Create user in Firebase Authentication
//     const userRecord = await auth.createUser({ email, password });

//     // Store additional user information in Firestore
//     await db.collection('users').doc(userRecord.uid).set({ email, role });

//     res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
//   } catch (error) {
//     if (error.code === 'auth/email-already-exists') {
//       res.status(400).json({ error: 'Email address is already in use' });
//     } else {
//       console.error('Registration error:', error);
//       res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
//   }
// });

//   app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Missing email or password' });
//     }
  
//     try {
//       // Sign in the user with email and password
//       const userCredential = await auth().signInWithEmailAndPassword(email, password);
  
//       // Successfully signed in
//       res.status(200).json({
//         message: 'Login successful',
//         uid: userCredential.user.uid,
//       });
//     } catch (error) {
//       console.error('Login error:', error.message);
//       res.status(401).json({ error: 'Invalid email or password' });
//     }
//   });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

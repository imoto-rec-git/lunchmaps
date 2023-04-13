import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnTkAndVgR2nKTITQRv28-Qwuzf9igvNE',
  authDomain: 'lunch-map-nextjs.firebaseapp.com',
  projectId: 'lunch-map-nextjs',
  storageBucket: 'lunch-map-nextjs.appspot.com',
  messagingSenderId: '204032198665',
  appId: '1:204032198665:web:c5c67ed602f3ec1510d0d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };

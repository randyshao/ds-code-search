import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const clientCredentials = {
  apiKey: 'AIzaSyAcN0OL7TIIZWVE32XyK4Zke1sBg0Rrir4',
  authDomain: 'cisc499-363c6.firebaseapp.com',
  projectId: 'cisc499-363c6',
  storageBucket: 'cisc499-363c6.appspot.com',
  messagingSenderId: '857841517769',
  appId: '1:857841517769:web:e8bc9b42ffbe3bef653918',
  measurementId: 'G-QQMRZS7H3Z',
};

const app = initializeApp(clientCredentials);

const db = getFirestore(app);

export { db };

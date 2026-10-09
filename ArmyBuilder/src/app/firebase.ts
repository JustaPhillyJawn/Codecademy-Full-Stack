import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAA-zzEsvSmqHvFUtF1-Rbuaz7ScRthy1Y',
  authDomain: 'armybui.firebaseapp.com',
  projectId: 'armybui',
  storageBucket: 'armybui.firebasestorage.app',
  messagingSenderId: '853256234093',
  appId: '1:853256234093:web:f27fbe7f36faee26c28b64'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

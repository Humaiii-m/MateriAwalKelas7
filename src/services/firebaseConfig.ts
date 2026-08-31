import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Client-side Firebase configuration (can be populated via environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoPlaceholderKeyForSMPInformatika',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'belajar-it-smp.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'belajar-it-smp',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'belajar-it-smp.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456789'
};

let db: Firestore | null = null;
let isFirebaseConfigured = false;

try {
  // Check if actual env vars are provided
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_API_KEY) {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    isFirebaseConfigured = true;
    console.log('🔥 Firebase Firestore terhubung langsung di client.');
  } else {
    // Graceful fallback to full-stack Express API backend
    console.log('ℹ️ Menggunakan Server-side Firestore Database backend.');
  }
} catch (e) {
  console.warn('Firebase client initialization note:', e);
}

export { db, isFirebaseConfigured };

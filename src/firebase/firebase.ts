import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRbyVxrBTU8PiDkEDwlg3Z0ebJwxJnja8",
  authDomain: "learn-lingo-f4a86.firebaseapp.com",
  databaseURL: "https://learn-lingo-f4a86-default-rtdb.firebaseio.com",
  projectId: "learn-lingo-f4a86",
  storageBucket: "learn-lingo-f4a86.firebasestorage.app",
  messagingSenderId: "1087736176292",
  appId: "1:1087736176292:web:9a9c012ce358b16847d031",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

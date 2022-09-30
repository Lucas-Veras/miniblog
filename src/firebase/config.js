
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-Jl0Hf6xgpxU3a9m65NK9modLYE7HgIs",
    authDomain: "miniblog-f94c7.firebaseapp.com",
    projectId: "miniblog-f94c7",
    storageBucket: "miniblog-f94c7.appspot.com",
    messagingSenderId: "738899378188",
    appId: "1:738899378188:web:6dc584b1db8028ad466e29"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
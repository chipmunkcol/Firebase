import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBlmyA6ZK4aJ44O6lC010M5c17JWpiUAMA",
    authDomain: "auth-c1322.firebaseapp.com",
    projectId: "auth-c1322",
    storageBucket: "auth-c1322.appspot.com",
    messagingSenderId: "831677399464",
    appId: "1:831677399464:web:263a95b8b7053be22a1d9d",
    measurementId: "G-P1F9JG76X8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();

import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from "firebase/auth"
import { child, get, getDatabase, onValue, push, ref, set, update } from "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyBlmyA6ZK4aJ44O6lC010M5c17JWpiUAMA", 
    authDomain: "auth-c1322.firebaseapp.com",
    projectId: "auth-c1322",
    storageBucket: "auth-c1322.appspot.com",
    messagingSenderId: "831677399464",
    appId: "1:831677399464:web:263a95b8b7053be22a1d9d",
    measurementId: "G-P1F9JG76X8",
    databaseURL: "https://auth-c1322-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();


export const db = getDatabase();
// export const postFB = (userId, title) => {
//     set(ref(db, 'users/' + userId), {
//         title
//     });
// }

// export const postFB2 = (uid, postId, content) => {
//     // Get a key for a new Post.
//     // const newPostKey = push(child(ref(db), 'posts')).key;
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/posts/' + uid + '/' + postId] = content;
  
//     return update(ref(db), updates);
// }
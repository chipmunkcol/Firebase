import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from "firebase/auth"
import { child, get, getDatabase, push, ref, set, update } from "firebase/database"

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


const db = getDatabase();
export const postFB = (uid, text) => { // uid = FB 에서 user_id 
    set(ref(db, 'users/' + uid), {
         text : text    
    })
}

// export function postNewFB (uid, text) {
//     const db  = getDatabase();
//     const postDate = {
//         uid: uid,
//         text: text,
//     };

//     const newPostKey = push(child(ref(db), 'posts')).key;
//     const updates = {};
//     update['/posts' + newPostKey] = postDate;
//     update['/user-posts/' + uid + '/' + newPostKey] = postDate;

//     return update(ref(db), updates);
// }

export const postNewFB = (text) => {
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {text})
}

export const getFB = (uid) => {
    const dbRef = ref(db);
    get(child(dbRef, `user/${uid}`)).then((state) => {
        if (state.exists()) {
            console.log(state.val());
        } else {
            console.log("데이터 없음")
        }
    }).catch((err) => {
        console.log(err)
    })
}
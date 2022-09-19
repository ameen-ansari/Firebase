import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const app = initializeApp({
    apiKey: "AIzaSyA8-Yxyh6Bo0hgcqSgP-YO6LTshETp8Qds",
    authDomain: "fooddx-aa127.firebaseapp.com",
    databaseURL: "https://fooddx-aa127-default-rtdb.firebaseio.com",
    projectId: "fooddx-aa127",
    storageBucket: "fooddx-aa127.appspot.com",
    messagingSenderId: "845272473894",
    appId: "1:845272473894:web:8f29f7a4485c2a9c2361e7"
});
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export default db
export{auth , storage}


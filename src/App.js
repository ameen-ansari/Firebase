import './App.css';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [inputval, setinputval] = useState("")
  const input = (e) => {
    setinputval(e.target.value)
    console.log(inputval);
  }
  // const post = async () => {
  //   setinputval(" ")
  //   const res = await fetch('https://fooddx-aa127-default-rtdb.firebaseio.com/fooddx.json', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     }, body: JSON.stringify({
  //       inputval
  //     })
  //   })
  // }
  const post = () => {
    console.log(app, auth);
    var xs = createUserWithEmailAndPassword(auth, inputval)
    console.log('xs init',xs);

  }


  // Initialize Firebase Authentication and get a reference to the service

  const firebaseConfig = {
    apiKey: "AIzaSyA8-Yxyh6Bo0hgcqSgP-YO6LTshETp8Qds",
    authDomain: "fooddx-aa127.firebaseapp.com",
    databaseURL: "https://fooddx-aa127-default-rtdb.firebaseio.com",
    projectId: "fooddx-aa127",
    storageBucket: "fooddx-aa127.appspot.com",
    messagingSenderId: "845272473894",
    appId: "1:845272473894:web:8f29f7a4485c2a9c2361e7"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return (
    <>
      <p style={{ textAlign: 'center', color: 'blue', fontWeight: '800', fontSize: '45px' }}> &rarr; &rarr; &rarr; Firebase Learning &larr; &larr; &larr;</p>
      <p style={{ textAlign: 'center', color: 'green', fontWeight: '800', fontSize: '35px' }}> &rarr; By Ameen Ansari &larr;</p>
      <label htmlFor="name">name:</label>
      <input type="text" id='name' value={inputval} onChange={input} />
      <button onClick={post}>Submit</button>
    </>
  );
}


export default App;
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

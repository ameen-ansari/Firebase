// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import  auth  from './Firebase';
import './App.css';
import { useState } from 'react';


function App() {
  const [inputval, setinputval] = useState("")
  const [inputval2, setinputval2] = useState("")
  const input = (e) => {
    setinputval(e.target.value)
    console.log(inputval);
  }
  const input2 = (e) => {
    setinputval2(e.target.value)
    console.log(inputval2);
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
  // const provider = new GoogleAuthProvider();
  // connectAuthEmulator(auth,'http://localhost:3000/')

  const post = async () => {
    const createu = await createUserWithEmailAndPassword(auth, inputval, inputval2)
    console.log(createu.user);
     

  }
  return (
    <>
      <p style={{ textAlign: 'center', color: 'blue', fontWeight: '800', fontSize: '45px' }}> &rarr; &rarr; &rarr; Firebase Learning &larr; &larr; &larr;</p>
      <p style={{ textAlign: 'center', color: 'green', fontWeight: '800', fontSize: '35px' }}> &rarr; By Ameen Ansari &larr;</p>
      <label htmlFor="name">Enter Email Here</label>
      <input type="text" id='name' required value={inputval} onChange={input} /><br />
      <label htmlFor="password" >Enter Password Here</label>
      <input type="password" id='password' required value={inputval2} onChange={input2} /><br />
      <button onClick={post}>Submit</button>
    </>
  );
}


export default App;
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

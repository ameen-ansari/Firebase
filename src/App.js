import {signOut, signInWithEmailAndPassword,onAuthStateChanged ,  createUserWithEmailAndPassword} from 'firebase/auth';
import  auth  from './Firebase';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [xcv, setxcv] = useState({})
  const [inputval, setinputval] = useState({
    email:"",
    password:""
  })
  const input = (e) => {
    var inputs = {[e.target.name]:e.target.value}
    setinputval({...inputval,...inputs})
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
  const post1 =  async () => {
    try{  
    await  signInWithEmailAndPassword(auth , inputval.email , inputval.password)
    alert('logged in')
  }catch(error){
    alert(error.message)
  }
}
const post2 = async () => {
  try{  
    await createUserWithEmailAndPassword(auth , inputval.email ,inputval.password)
    alert('User created')
  }catch(error){
    alert(error.message)
  }
}
const logout = () =>{
  signOut(auth)
  alert('logged out')
}
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      setxcv(currentUser)
    });
  },[])
  return (
    <>
      <p style={{ textAlign: 'center', color: 'blue', fontWeight: '800', fontSize: '45px' }}> &rarr; &rarr; &rarr; Firebase Learning &larr; &larr; &larr;</p>
      <p style={{ textAlign: 'center', color: 'green', fontWeight: '800', fontSize: '35px' }}> &rarr; By Ameen Ansari &larr;</p>
      <label htmlFor="name">Enter Email Here</label>
      <input type="email" name='email' id='name' required value={inputval.email} onChange={input} /><br />
      <label htmlFor="password" >Enter Password Here</label>
      <input type="password" id='password' name='password' required value={inputval.password} onChange={input} /><br />
      <button onClick={post1}>SignIn</button>
      <button onClick={post2}>CreateAcount</button>
      <button onClick={logout}>logout</button>

      <h2>{xcv?.email}</h2>
    </>
  );
}


export default App;

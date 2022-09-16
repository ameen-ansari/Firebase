import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import db, { auth  } from '../Firebase';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Homepage(props) {
    const id = "86LLPFVhl5hBntvqfSES"
    const onClick = async() => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        console.log("data", docSnap.data());
        // const querySnapshot = await getDocs(collection(db, "users"));
        // const data = []
// querySnapshot.forEach((doc) => {
//   data.push(doc.data())
// })
// console.log("data", data);
    }
    const logout = () => {
        auth.signOut()
    }
    return (
        <div>
            {/* <Link to="signup" style={{ margin: "1rem", textDecoration: 'none' }}> */}
                <Button onClick={onClick} style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none' }} variant="bordered" disableElevation>
                    sign up
                </Button>
            {/* </Link> */}
            <Link to="sign" style={{ margin: "1rem", textDecoration: 'none' }}>
                <Button style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none' }} variant="bordered" disableElevation>
                    Sign In
                </Button>
            </Link>
            <Button onClick={logout} style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none', margin: "1rem", }} variant="bordered" disableElevation>
                Logout
            </Button>
            <h1>My Home Page of Demo</h1>
            <h1>{props.printmail}</h1>
        </div>
    )
}

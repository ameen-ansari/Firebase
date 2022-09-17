import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import db, { auth } from '../Firebase';
import { doc, getDoc, collection, getDocs, setDoc, query, where } from "firebase/firestore";

export default function Homepage(props) {
    const [uservalue, setvalue] = useState({
        email: "",
        userName: "",
        phone: "",
        password: "",
        message: "",
        uid: ""
    })
    let userObj ;
    const onClick = async () => {
        let UID = auth.currentUser.uid
        console.log(UID);

        // const docRef = doc(db, "users" , "72wAScfMFSfj7ayiHjey");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }

        const q = query(collection(db, "users"), where("UserId", "==", UID));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userObj = doc.data()
            setvalue({
                email: userObj.UserName,
                userName: userObj.Email,
                phone: userObj.Password,
                password: userObj.PhoneNumber,
                message: userObj.UserId,
                uid: userObj.Msg
            })
        });
        // const docRef = doc(db, "users", id);
        // const docSnap = await getDoc(docRef);
        // console.log("data", docSnap.data());
        // const querySnapshot = await getDocs(collection(db, "users"));
        // const data = []
        // querySnapshot.forEach((doc) => {
        //     data.push(doc.data())
        // })
        // querySnapshot.forEach((doc) => {
        //     console.log(doc);
        // })
        // console.log("data", data);
        // ---
        // Add a new document in collection "cities"
        // let xhr = await setDoc(doc(db, "demo" , " xhhhhhhhhhhhhr"), {
        //     name: "Los Angeles",
        //     state: "xyz8",
        //     country: "Pakistan"
        // });
        // console.log(xhr);
        // ---
        // const cityRef = doc(db, 'cities', 'BJ');
        // setDoc(cityRef, { merge: true }, { capital: true });
        // --

    }
    const logout = () => {
        auth.signOut()
    }
    return (
        <div>
            <h2>{props?.printmail}</h2>
            <Link to="signup" style={{ margin: "1rem", textDecoration: 'none' }}>
                <Button style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none' }} variant="bordered" disableElevation>
                    sign up
                </Button>
            </Link>
            <Link to="sign" style={{ margin: "1rem", textDecoration: 'none' }}>
                <Button style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none' }} variant="bordered" disableElevation>
                    Sign In
                </Button>
            </Link>
            <Button onClick={logout} style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none', margin: "1rem", }} variant="bordered" disableElevation>
                Logout
            </Button>
            <Button onClick={onClick} style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none', margin: "1rem", }} variant="bordered" disableElevation>
                GetData
            </Button><br />
            <p>{"Email = "+uservalue.email}</p>
            <p>{"Name = "+uservalue.userName}</p>
            <p>{"PhoneNumber = "+uservalue.phone}</p>
            <p>{"Password = "+uservalue.password}</p>
            <p>{"Message = "+uservalue.message}</p>
            <p>{"Uid = "+uservalue.uid}</p>
        </div>
    )
}

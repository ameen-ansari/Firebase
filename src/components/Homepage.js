import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import db, { auth, storage } from '../Firebase';
import { doc, getDoc, collection, getDocs, setDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

export default function Homepage(props) {
    const [imgurl, setimgurl] = useState()
    const [uservalue, setvalue] = useState({
        email: "",
        userName: "",
        phone: "",
        password: "",
        message: "",
        uid: ""
    })
    let userObj;
    // const onClick = async () => {
    //     let UID = auth.currentUser.uid
    //     console.log(UID);
    //     const q = query(collection(db, "users"), where("UserId", "==", UID));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         userObj = doc.data()
    //         setvalue({
    //             email: userObj.Email,
    //             userName: userObj.UserName,
    //             phone: userObj.PhoneNumber,
    //             password: userObj.Password,
    //             message: userObj.Msg,
    //             uid: userObj.UserId
    //         })
    //     });
    // }
    const logout = () => {
        auth.signOut()
    }
    const getf = (e) => {
        // setimgurl([...imgurl,e.target.files[0]])
        setimgurl(e.target.files[0])

    }
    const upl = async () => {
        const refrence = ref(storage, `images/${imgurl.name}`)
        try{
            await uploadBytes(refrence , imgurl)
            alert("SUCESSFULLY uPLOADED")
        }catch(e){
            alert("error",e.message)
        }

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
            {/* <Button onClick={onClick} style={{ fontWeight: '800', color: 'black', backgroundColor: 'orange', textDecoration: 'none', margin: "1rem", }} variant="bordered" disableElevation>
                GetData
            </Button><br /> */}
            <input type="file" onChange={getf} />
            <button onClick={upl}>Upload</button>
        </div>
    )
}

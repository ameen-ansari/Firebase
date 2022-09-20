import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import db, { auth, storage } from '../Firebase';
import { doc, getDoc, collection, getDocs, setDoc, query, where, addDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

export default function Homepage(props) {
    const [imgurl, setimgurl] = useState()
    // const [uservalue, setvalue] = useState({
    //     email: "",
    //     userName: "",
    //     phone: "",
    //     password: "",
    //     message: "",
    //     uid: ""
    // })
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
    const getf =async (e) => {
        setimgurl(e.target.files[0])
    }
    const upl = async (e) => {
        let refrence1 = ref(storage , `Images/${imgurl.name}`)
        let refrence2 = ref(storage , `Images/${imgurl.name}`)
        try{
            await uploadBytes(refrence1, imgurl)
            alert("Uploaded")
            await getDownloadURL(refrence2).then((e)=>{
                let q = query(collection(db,'ImageUrls') ,where("uid" ,"==" ,auth.currentUser.uid) )
                getDocs(q).then((a)=>{
                    a.forEach((u)=>{
                        u.data()                        
                        setDoc(doc(db,"ImageUrls",u),{src:"op"})
                    })
                })
            })

        }catch(e){
            alert(e.message)
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
            <br />
        </div>
    )
}

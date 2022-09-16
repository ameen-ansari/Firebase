import React from 'react'
import logincss from "./Signup.module.css"
import { Button } from '@mui/material'
import img1 from '../Images/fb.png'
import img3 from '../Images/Group 50.png'
import img4 from '../Images/iph.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Firebase'
import db from '../Firebase'
// import { setDoc, doc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


export default function Login() {
    var navigator = useNavigate()
    const [values, setvalues] = useState({
        Email: "",
        Password: "",
        UserName: "",
        PhoneNumber: "",
    })
    const valueadjecter = (e) => {
        var input = { [e.target.name]: e.target.value }
        setvalues(
            {
                ...values, ...input
            }
        )
    }
    async function createuser() {
        try {
            var ui = await createUserWithEmailAndPassword(auth, values.Email, values.Password)
            var user = ui.user.uid
            console.log(user);
            try {
                await addDoc(collection(db, "users"), values);
            } catch (e) {
                alert(e.message)
            }
            alert('Acount Created')
            navigator('/sign')
        } catch (error) {
            alert(error.message)
        }
        console.log(user);
    }
    return (
        <div className={logincss.container}>
            <div className={logincss.login}>
                <div className={logincss.head}>
                    <p>Welcome to <span style={{ color: "var(--orange)" }}>FoodDX</span></p>
                    <p>Have An Account ?<Link to="/sign" style={{ textDecoration: 'none', color: "var(--orange)" }}><span> Sign in</span></Link></p>
                </div>
                <p>Sign up</p>
                <div>
                    <img src={img3} alt=" " />
                    <img src={img1} alt="" />
                    <img src={img4} alt="" />
                </div>
                <p>Enter username or email  address</p>
                {/* //email */}
                <input type="email" name='Email' value={values.Email} onChange={valueadjecter} placeholder='Enter username or email address' />
                <div className={logincss.twoinputs} >
                    <div>
                        <p>User Name</p>
                        <input value={values.UserName} onChange={valueadjecter} type="text" name='UserName' placeholder='User Name' />
                    </div>
                    <div>
                        <p>Contact #</p>
                        <input value={values.PhoneNumber} onChange={valueadjecter} type="text" name='PhoneNumber' placeholder='Contact Number' />
                    </div>
                </div>
                <p>Enter your Password</p>
                {/* //password */}
                <input value={values.Password} name='Password' onChange={valueadjecter} type="password" placeholder='Enter your Password' />
                <Button onClick={createuser} style={{ color: 'black', backgroundColor: 'orange' }} variant="contained" disableElevation>
                    Sign up
                </Button>
            </div>
        </div>
    )
}


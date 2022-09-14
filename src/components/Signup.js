import React from 'react'
import logincss from "./Signup.module.css"
import { Button } from '@mui/material'
import img1 from '../Images/fb.png'
import img3 from '../Images/Group 50.png'
import img4 from '../Images/iph.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile }  from "firebase/auth";
import { auth } from '../Firebase'


export default function Login() {
    var navigator = useNavigate()
    const [values, setvalues] = useState({
        email: "",
        password: "",
        uname: "",
        phone: ""
    })
    const valueadjecter = (e) => {
        var input = { [e.target.name]: e.target.value }
        setvalues(
            {
                ...values, ...input
            }
        )
    }
    const createuser = async () => {
        try {
            var ui = await createUserWithEmailAndPassword(auth, values.email, values.password)
            var user = ui.user
            alert('Acount Created')
            navigator('/login')
            await updateProfile(user, {
                displayName: values.uname,
                photoURL: values.phone
            })
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
                    <p>Have An Account ?<Link to="/login" style={{ textDecoration: 'none', color: "var(--orange)" }}><span> Sign in</span></Link></p>
                </div>
                <p>Sign up</p>
                <div>
                    <img src={img3} alt=" " />
                    <img src={img1} alt="" />
                    <img src={img4} alt="" />
                </div>
                <p>Enter username or email  address</p>
                {/* //email */}
                <input type="email" name='email' value={values.email} onChange={valueadjecter} placeholder='Enter username or email address' />
                <div className={logincss.twoinputs} >
                    <div>
                        <p>User Name</p>
                        <input value={values.uname} onChange={valueadjecter} type="text" name='uname' placeholder='User Name' />
                    </div>
                    <div>
                        <p>Contact #</p>
                        <input value={values.phone} onChange={valueadjecter} type="text" name='phone' placeholder='Contact Number' />
                    </div>
                </div>
                <p>Enter your Password</p>
                {/* //password */}
                <input value={values.password} name='password' onChange={valueadjecter} type="password" placeholder='Enter your Password' />
                <Button onClick={createuser} style={{ color: 'black', backgroundColor: 'orange' }} variant="contained" disableElevation>
                    Sign up
                </Button>
            </div>
        </div>
    )
}


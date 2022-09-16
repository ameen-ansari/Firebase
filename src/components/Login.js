import React from 'react'
import logincss from "./login.module.css"
import { Button } from '@mui/material'
import img1 from '../Images/fb.png'
import img2 from '../Images/google.png'
import img3 from '../Images/Group 50.png'
import img4 from '../Images/iph.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase'
import db from '../Firebase'
import { setDoc, doc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


export default function Sign() {
    var navigator = useNavigate()
    const [values, setvalues] = useState({
        email: "",
        password: "",
    })
    const valueadjecter = (e) => {
        var input = { [e.target.name]: e.target.value }
        setvalues(
            {
                ...values, ...input
            }
        )
    }
    const signin = async () => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
            navigator('/')
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div className={logincss.container}>
            <div className={logincss.login}>
                <div className={logincss.head}>
                    <p>Welcome to <span>FoodDX</span></p>
                    <p>No Account ?
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <span>  Sign up</span>
                        </Link>
                    </p>
                </div>
                <p>Sign in</p>
                <div>
                    <img src={img3} alt="a" />
                    <img src={img2} alt="b" />
                    <img src={img1} alt="c" />
                </div>
                <p>Enter username or email  address</p>
                <input value={values.email} onChange={valueadjecter} style={{ height: '45px' }} name="email" type="email" placeholder='Enter username or email address' />
                <p>Enter your Password</p>
                <input value={values.password} onChange={valueadjecter} style={{ height: '45px' }} name="password" type="password" placeholder='Enter your Password' />
                <Link to="/forgetpassword" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className={logincss.fgp}>
                        <p >Forgot Password </p>
                    </div>
                </Link>
                <Button onClick={signin} style={{ color: 'black', backgroundColor: 'orange' }} variant="bordered" disableElevation>
                    Sign In
                </Button>
            </div>
        </div>
    )
}


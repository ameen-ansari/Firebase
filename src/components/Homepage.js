import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import db, { auth, storage } from '../Firebase';
import { doc, getDoc, collection, getDocs, setDoc, query, where, addDoc, updateDoc, set } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

export default function Homepage(props) {
    const [imgurl, setimgurl] = useState()
    const [urls, seturls] = useState()
    // var refrence3;
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
    const getf = async (e) => {
        setimgurl(e.target.files[0])
    }
    // let df;
    const upl = async (e) => {
        try {
            if (auth.currentUser.uid === null) {
            }
            else {
                try {
                    let refrence1 = ref(storage, `Images/${imgurl.name}`)
                    let refrence2 = ref(storage, `Images/${imgurl.name}`)
                    await uploadBytes(refrence1, imgurl)
                    alert("Uploaded")
                    const querySnapshot = await getDocs(collection(db, "Images"));
                    await getDownloadURL(refrence2).then((e) => {
                        seturls(e)
                        let contain = document.getElementById("contain")
                        contain.innerHTML += `<img src=${e} width="200px" height="200px"></img>`
                        // addDoc(collection(db, "New ImgC"), { src: e })
                        // refrence3 = ref(collection(db, `New ImgC`))
                        // getDocs(refrence3).then((a) => {
                        //     a.forEach((u) => {
                        //         df = u.data().src
                        //         seturls(df)
                        //         // console.log(urls);
                        //     })
                        // })
                    })


                    // querySnapshot.forEach((doc) => {
                    //     console.log(doc.data().src);
                    // });
                    // get data from 1 object in firestore
                    // await setDoc(doc(db, "Images", gg), { "name": 'ameen akbar' });
                    // const frankDocRef = doc(db, "Images", "frank");
                    // await setDoc(frankDocRef, {
                    //     name: "Frank",
                    //     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
                    //     age: 12
                    // });

                    // To update age and favorite color:
                    // await updateDoc(frankDocRef, {
                    //     "age": 13,
                    //     "favorites.color": "Red"
                    // });
                    // const querySnapshot = await getDocs(collection(db, "users"));
                    // querySnapshot.forEach((doc) => {
                    //     doc.data() is never undefined for query doc snapshots
                    //     console.log(doc.data());
                    // });
                    //======
                    // const docRef = doc(db, "users/");
                    // const docSnap = await getDoc(docRef);

                    // if (docSnap.exists()) {
                    //     console.log("Document data:", docSnap.data().mg);
                    // } else {
                    //     // doc.data() will be undefined in this case
                    //     console.log("No such document!");
                    // }
                    // =====
                    // const querySnapshot = await getDocs(collection(db, "Images"));
                    // querySnapshot.forEach((doc) => {
                    //     console.log(`${doc.id} => ${doc.data().msg}`);
                    // });
                    //get data from 1 object in firestore
                    // await getDownloadURL(refrence2).then((e)=>{
                    // let q = query(collection(db,'ImageUrls') ,where("src" ,"==" ,auth.currentUser.uid) )

                    // getDocs(q).then((a)=>{
                    //     a.forEach((u)=>{
                    //         let df = u.data()      
                    //         console.log(df);
                    //     })
                    // })
                    // })

                } catch (e) {
                    alert(e.message)
                }
            }
        } catch (e) {
            alert('pleace Signup First')
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
            <div id="contain" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: '1rem' }}></div>
        </div>
    )
}

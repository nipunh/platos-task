import React, {useEffect, useState} from 'react'
import Users from './Users'
import firebase from '../../config/fbconfig'

export default function About() {

    const [users, setUsers] = useState([]);

    
    useEffect(() => {

        //Using Streams to get live data
        const fetchData = async () =>{
            const db = firebase.firestore();
            await db.collection('users').onSnapshot((user)=>{
                setUsers(user.docs.map(doc => ({...doc.data(), id:doc.id})))
        })}

        //Get data once component is mounted

        // const fetchData = () => {
        //     const db = firebase.firestore();
        //     db.collection('users').get().then((user)=>{
        //             setUsers(user.docs.map((doc)=>({
        //                 ...doc.data(), id:doc.id 
        //             })
        //             ))
        //     })
        // }

        fetchData()
    }, [])


    return (
        <div className="container">
        <h1 className="text-center my-5">Users</h1>
            <Users users={users}   />
        </div>
    )
}


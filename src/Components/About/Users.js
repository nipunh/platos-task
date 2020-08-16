import React, {useState} from 'react'
import firebase from '../../config/fbconfig'
import Error from '../Alerts/Error';
import Success from '../Alerts/Success';
import Loading from '../Alerts/Loading';
export default function Users({users}) {

    const [newUser, setnewUser] = useState({
        name : '',
        lastname : '',
        email : ''
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(null);

    //Update funtion to interact with db and update data
    const updateData = async (user) =>{
        setSuccess(null);
        const db = firebase.firestore();
        await db.collection('users').doc(user.id).update({
            name : user.name,
            lastname : user.lastname,
            email : user.email 
        })}
    
    //handle changes made in the form and update state
    const handleChange = (e) =>{
        setSuccess(null);
        setnewUser({
            ...newUser,
            loading : false,
            error : false,
            success : null,
            [e.target.id] : e.target.value
        })
    }

    //handle submit and update data in db
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newUser)
        setLoading(true);
        updateData(newUser).then(()=>{
            setSuccess(true)
            setLoading(false)
        }).catch((err)=>{
            setError({
                state : true,
                message : err
            });
            setLoading(false);
            setSuccess(false);
        })



    }

    //Clear pre-loaded fields of update form
    const clearField = (e) =>{
        setnewUser({
            ...newUser, 
            [e.target.id] : '',
        })
    }

    const handleClose = (e) => {
        setError(false);
        setLoading(false);
        setSuccess(null)
    }
    
    return (
        <div className="row"> {
            users && users.map(user => {
                return(
                <div className="col-lg-5" key={user.id}>    
                    <div className=" card m-2"  >
                        
                        {/* User Card */}
                        <div className="card-body">
                            <h5 className="card-title">
                            {user.name} {user.lastname}</h5>
                            <p className="card-text">
                            <span className="badge badge-secondary mx-2">Email:   </span>{user.email}</p>
                        </div>

                        {/* Edit Button to show modal   */}
                        <button 
                            type="button"
                            className="btn btn-primary" 
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={()=>{setnewUser({...user})}}
                            >
                            Edit
                        </button>
                        </div>

                {/*Modal with upfation form*/}
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Project</h5>
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="modal" 
                                    aria-label="Close"
                                    onClick ={()=>{
                                        handleClose()
                                        }}
                                    >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={(e)=>{handleSubmit(e)}}
                         >
                            <label htmlFor="title">First Name</label>
                            <div className="form-group input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="name" 
                                    value = {newUser.name} 
                                    onChange = {(e)=>{handleChange(e)}} 
                                    placeholder="Enter First Name" 
                                    required
                                />
                                <div className="input-group-append">
                                    <button 
                                    id="name" 
                                    className="btn btn-danger"
                                    onClick = {(e)=>{clearField(e)}} 
                                    type="button">X</button>
                                </div>
                            </div>

                            <label htmlFor="title">Last Name</label>
                            <div className="form-group input-group">
                                <input type="text" 
                                    className="form-control" 
                                    id="lastname" 
                                    value = {newUser.lastname} 
                                    onChange = {(e)=>{handleChange(e)}} 
                                    placeholder="Enter Last Name" 
                                    required
                                />

                                <div className="input-group-append">
                                    <button 
                                    id="lastname" 
                                    className="btn btn-danger"
                                    onClick = {(e)=>{clearField(e)}} 
                                    type="button">X</button>
                                </div>
                            </div>

                            <label htmlFor="content">Email</label>
                            <div className="form-group input-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email"
                                    value = {newUser.email} 
                                    onChange = {(e)=>{handleChange(e)}}
                                    placeholder="Email Address"
                                    required
                                />
                                <div className="input-group-append">
                                    <button 
                                    id="email" 
                                    className="btn btn-danger"
                                    onClick = {(e)=>{clearField(e)}} 
                                    type="button">X</button>
                                </div>
                            </div>
                            
                            {/* Alerts */}
                            {
                                success === true ? 
                                <Success />  : null
                            }

                            {
                                error && <Error />
                            }
                            
                            {
                                loading ? <Loading />
                                :
                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                            }

                            </form>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>        
                            
                )
            }) }
            </div>
    )
}

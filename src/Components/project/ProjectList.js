import React, { Component } from 'react'
import Success from '../Alerts/Success'
import Loading from '../Alerts/Loading'
import Error from '../Alerts/Error'
import { connect } from 'react-redux'
import { updateProject } from '../../store/actions/projectActions'
import '../../index.css'

class ProjectList extends Component {
    
    state = {
        title : '',
        content : '',
        loading : false,
        error : false, 
        success : null
    }
    
    // Handle changes made in form
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value,
        })
    }

    // Handle submit button, call the updateProject action
    // from project actions
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateProject(this.state)
    }

    //Clear pre-loaded fields of update form
    clearField = (e) =>{
        this.setState({
            [e.target.id] : '',
        })
    }


    render() {
    
    const {firestore} = this.props
    const projects = firestore.ordered.projects;
        
    return (
        <div>{
        projects && projects.map(project => {
            return(
                    <div className="card m-2 shadow p-3 my-4" key={project.id}>

                        {/* Project Details Card  */}
                        <div className="card-body">
                            <h5 className="card-title">{project.title}</h5>
                            <p className="card-text">{project.content}</p>
                            
                            {/* Button to call modal */}
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                data-toggle="modal"
                                data-target="#exampleModal"
                                //Set State based on project selected
                                onClick={()=>{this.setState({...project})}}
                                >
                                Edit
                            </button>
                            
                        </div>
                    </div>
            )
        }) }
        <div>

            {/* Modal with update form */}
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
                                    onClick={()=>{this.setState({
                                        success : null
                                    })}}
                                    >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={this.handleSubmit} >
                        <label htmlFor="title">Project Title</label>
                            <div className="form-group input-group">
                                
                                <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                value = {this.state.title} 
                                onChange = {this.handleChange}
                                placeholder="Enter title" 
                                required
                                />
                                   
                                <div className="input-group-append">
                                    <button 
                                    id="title" 
                                    className="btn btn-danger"
                                    onClick = {(e)=>{this.clearField(e)}} 
                                    type="button">X</button>
                                </div>

                                    
                            </div>
                            <label htmlFor="content">Content</label>
                            <div className="form-group input-group">
                               
                                <br/>
                                <textarea 
                                    type="text" 
                                    className="form-control" 
                                    id="content"
                                    value = {this.state.content} 
                                    onChange = {this.handleChange}
                                    placeholder="Enter project details..."

                                />

                                <div className="input-group-append">
                                    <button 
                                    id="content" 
                                    className="btn btn-danger"
                                    onClick = {(e)=>{this.clearField(e)}} 
                                    type="button">X</button>
                                </div>
                                
                            </div>

                            {/* Alerts */}
                            {
                                this.state.success === true ? 
                                <Success />   : null
                            }


                            {
                                this.state.error && 
                                <Error />
                            }
                            
                            {
                                this.state.loading === true ? <Loading />
                                :
                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                            }

                            
                        </form>
                        </div>
                        </div>
                        </div>
                    </div>
        </div>
        </div>
    )
}
}

//Dispatch the updateProject action 
const mapDispatchToProps = (dispatch) =>{
    return{
        updateProject : (project) => dispatch(updateProject(project))
    }
}

//Map state with redux central store
const mapStateToProps = (state) => {
    // console.log(state)
    return{
        firestore : state.firestore,
    }
}

//Subscribe/ connect ProjectList component to the Redux central store
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'

class CreateProject extends Component {
    state = {
        title : '',
        content : '',
    }

    // Handle Chnages in create project from
    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value,
        })
    }

    // Handle submit button,
    // Call the createProject action
    // Reinitialize state
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state);
        e.target.reset();
        this.setState({
            title : '',
            content : '',
        })
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit} className="shadow p-5 my-4">
                <h3 className="text-center">Create Project</h3>
                
                <div className="form-group">
                    <label htmlFor="title">Project Title</label>
                    <input type="text" 
                    className="form-control" 
                    id="title" 
                    onChange = {this.handleChange}
                    aria-describedby="titleHelp" 
                    placeholder="Enter title" 
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text" 
                        className="form-control" 
                        id="content" 
                        onChange = {this.handleChange}
                        placeholder="content"
                        required
                    />
                </div>
                <center>
                    <button type="submit" className="btn btn-lg btn-primary ">Create</button>
                </center>
            </form>
        )
    }
}

//Dispatch the updateProject action
const mapDispatchToProps = (dispatch) =>{
    return{
        createProject : (project) => dispatch(createProject(project))
    }
}


// Subscribe/Connect CreateProject component to redux central store
export default connect(null, mapDispatchToProps)(CreateProject)

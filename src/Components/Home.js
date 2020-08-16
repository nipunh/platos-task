import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectList from './project/ProjectList'
import CreateProject from './project/CreateProject'
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'

class Home extends Component {
    render() {

        const { projects } = this.props
        
        return (
            <div className="container-fluid row">

                <div className="col-lg-5 offset-lg-1">
                    <CreateProject />
                </div>

                <div className="col-lg-5">
                    <ProjectList projects={projects} />
                </div>

            </div>    
        )
    }
}

//To map component's state with redux central store
const mapStateToProps = (state) => {
    // console.log(state)
    return{
        projects : state.firestore.ordered.projects

    }
}

//To subscribe/connect Home component with redux and firestore
export default compose(
        connect(mapStateToProps), 
        firestoreConnect([
            {
                collection : 'projects'
            }
        ])
    )(Home);
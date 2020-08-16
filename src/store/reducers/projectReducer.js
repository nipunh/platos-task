const initState = {
    projects : [
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {

        case 'CREATE_PROJECT' : 
            console.log("Created project", action.project)
            return state

        case 'CREATE_PROJECT_ERROR' :
            console.log("Created project error", action.err)
            return state

        case 'UPDATE_PROJECT' : 
            console.log("Updated project", action.project)
            return state
            
        case 'UPDATE_PROJECT_ERROR' :
            console.log("Update project error", action.err)
            return state
            
        default :
            return state;      
    }
   
}

export default projectReducer;
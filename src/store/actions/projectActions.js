export const  createProject = (project) => {
    //Pause dispatch action using thunk middleware, make async call to db
    return (dispatch, getState, {getFirestore}) => {
        //Make async calls to db(firebase)
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project,
            createdAt : new Date()
        }).then(()=>{
            //then dispatch action to reducers
            dispatch({
                type : 'CREATE_PROJECT',
                project
            })
        }).catch((err)=>{
            dispatch({
            type : 'CREATE_PROJECT_ERROR',
            err
            })
        })
    }
}

export const  updateProject = (project) => {
    //Pause dispatch action using thunk middleware, make async call to db
    return (dispatch,getState, {getFirestore}) => {
        
        //Make async calls to db(firebase)
        const firestore = getFirestore();
        project.loading = true;
        
        //Make updates to the db
        firestore.collection('projects').doc(project.id).update({
            title : project.title,
            content : project.content,
            createdAt : project.createdAt,
            updatedAt : new Date()
        }).then(()=>{
            // then dispatch action to reducers
            project.loading = false;
            project.success = true;
            dispatch({
                type : 'UPDATE_PROJECT',
                project 
            })
        }).catch((err)=>{
            project.error = true;
            project.loading = false;
            project.success = false;
            dispatch({
                type : 'UPDATE_PROJECT_ERROR',
                err
            })
        })
    }
}
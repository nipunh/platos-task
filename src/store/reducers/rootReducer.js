import projectReducer from './projectReducer'
import {firestoreReducer} from 'redux-firestore'
import { combineReducers } from 'redux'

//Combine Redux and firestore reducer to one root reducer
const rootReducer =  combineReducers({
    project : projectReducer,
    firestore : firestoreReducer
})

export default rootReducer;
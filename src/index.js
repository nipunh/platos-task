import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore ,getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from './config/fbconfig';
import fbconfig from './config/fbconfig';


//Store with thunk to pause dispatch action
//Extra middlewares(getFirestore) 
//for easier access to firestore functionalities
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase  ,getFirestore})),
    reduxFirestore(fbconfig),
    )
  );

  //React Redux Firebase props
  const rrfProps ={
    firebase,
    config : fbconfig,
    dispatch : store.dispatch,
    createFirestoreInstance
  }

ReactDOM.render(
  
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>  
  </Provider>,

  document.getElementById('root')
);


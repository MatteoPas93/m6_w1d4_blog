import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {configureStore, combineReducers} from "@reduxjs/toolkit"
// import { Provider } from 'react-redux';

// import postReducer from "./redux/posts/postSlice"

// const rootReducers = combineReducers({
//    postData : postReducer
// })

// const store = configureStore({
//   reducer: rootReducers
// })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>
);


import React from "react";
import ReactDOM from "react-dom";
import { persistStore } from 'redux-persist'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import {BrowserRouter as Router} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
let persistor = persistStore(store)
ReactDOM.render(
     <Provider store = {store}>
     <PersistGate loading={null} persistor={persistor}>
   <Router>
    <App/>
    </Router>
    </PersistGate>
    </Provider>
  
, document.getElementById("root"))
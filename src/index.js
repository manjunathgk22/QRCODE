import React from "react";
import { render } from "react-dom";
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import Navigation from './util/Navigation';
import './sass/Base.scss';
import './sass/fonts.scss';
import register from './registerServoceWorker'

// Register SW
if(process.env.NODE_ENV === 'production')
  register(process.env)

render(
  <HashRouter ref = {(navRef)=>{Navigation.setNavigator(navRef)}}>
      <App />
  </HashRouter>,
  document.getElementById("root")
);



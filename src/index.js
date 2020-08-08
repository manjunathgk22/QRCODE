import React from "react";
import { render } from "react-dom";
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import Navigation from './util/Navigation';
import './sass/Base.scss';
import './sass/fonts.scss';
import register from './registerServoceWorker'
import {Provider} from "mobx-react";
import LoginStore from './Stores/LoginStore'
import BaseStore from './stores/BaseStore'
import DashboardStore from './stores/dashboardStore';
import QrcodeStore from './stores/QrcodeStore';
import MenuStore from './stores/MenuStore';
import ServiceStore from './stores/ServiceStore';
import OrderStore from './stores/OrderStore'
import BillStore from './stores/BillStore'
import registersw from './notif';
// Register SW
// if(process.env.NODE_ENV === 'production')
//   register(process.env)
if ("serviceWorker" in navigator) {
  registersw();
}


Notification.requestPermission()
render(
  <HashRouter ref = {(navRef)=>{Navigation.setNavigator(navRef)}}>
    <Provider 
    loginStore = {new LoginStore()}
    baseStore = {new BaseStore()}
    qrcodeStore = {new QrcodeStore()}
    dashboardStore = {new DashboardStore()}
    menuStore = {new MenuStore()}
    serviceStore = {new ServiceStore()}
    orderStore = {new OrderStore()}
    billStore = {new BillStore}
    >
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);



import React from 'react'
import { Suspense, lazy, useEffect } from 'preact/compat';
import { Switch, Route, Redirect } from 'react-router-dom'
import BaseStore from '../stores/BaseStore';
import {inject, Observer} from 'mobx-react';
import AppConstant from '../constant/AppConstant';
import AppUtility from '../util/AppUtility';
import Restaurant from './Restaurant/Restaurant';
import Qrcodes from './Qrcodes/Qrcodes';
import MenuDashboard from './MenuDashboard/MenuDashboard';
import CustomerDashboard from './Customer/CustomerDashboard';
import CustomerMenu from './Customer/CustomerMenu';
import CartDetails from './CartModel/CartDetails';
import ServiceDashboard from './ServiceDashboard/ServiceDashboard';
import Orders from './Orders/Orders';
import Toast from './Toast/Toast';
import notifToast from '../notifToast/notifToast';
import Bills from './Bills/Bills';
const Login = lazy(() => import('./Login/Login'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
  
  //To check if the requested path needs authentication
  const AuthRoute = (props)=>{

      if(false &&  (!localStorage.getItem('LOGINDATA'))){
        return <Redirect to="/login" />
      }else{
        
        props.baseStore.sidebar = AppConstant.SIDEBAR.map(item=>{
          item.isSelected = false
          if(props.path == '/' && item.path === '/dashboard'){
            item.isSelected = true
          }else if (props.path === item.path){
            item.isSelected = true
          }
          return item;
        })
        if(props.path == '/'){
          return <Redirect to="/dashboard" />
        }
        return <Route {...props} />
        
      }
  }

const Main = (props) => {
  
  useEffect(() => {
    
    if(localStorage.getItem('LOGINDATA')){
      BaseStore.LOGINDATA = JSON.parse(localStorage.getItem('LOGINDATA'))
    }
    
      navigator.serviceWorker.onmessage = (event) => {
        props.event = event.data;
        notifToast({...props})
        
      };
      }, [])
  return(
    <React.Fragment>
    <Suspense fallback={<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><p>Loading...</p></div>}>
      <Switch>
      <AuthRoute {...props} exact path='/' component={()=>{}}/>
      <Route {...props} exact path='/login' component={Login}/>   {/* Dont use AuthRoute here. Will lead to infinite loop */}
      <AuthRoute {...props} exact path='/dashboard' component={Dashboard}/>
      <AuthRoute {...props} exact path='/qrcodes' component={Qrcodes}/>
      <AuthRoute {...props} exact path='/menus' component={MenuDashboard}/>
      <AuthRoute {...props} exact path='/services' component={ServiceDashboard}/>
      <AuthRoute {...props} exact path='/orders' component={Orders}/>
      <AuthRoute {...props} exact path='/bills' component={Bills}/>
      <AuthRoute {...props} exact path='/restaurant' component={Restaurant}/>
      <AuthRoute {...props} exact path='/customer/dashboard' component={CustomerDashboard}/>
      <AuthRoute {...props} exact path='/customer/menu' component={CustomerMenu}/>
      <AuthRoute {...props} exact path='/customer/cartmodel' component={CartDetails}/>
      <AuthRoute path="/"  />
    </Switch>
    </Suspense>
  <Observer>{()=>(<Toast toastList={props.baseStore.toastMessage}/>)}</Observer>
    
    </React.Fragment>
  )
  }

export default  inject('baseStore', 'orderStore')(Main)

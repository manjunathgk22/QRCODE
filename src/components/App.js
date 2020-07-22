import { Suspense, lazy, useEffect } from 'preact/compat';
import { Switch, Route, Redirect } from 'react-router-dom'
import BaseStore from '../stores/BaseStore';
const Login = lazy(() => import('./Login/Login'));
const Dashboard = lazy(() => import('./Dashboard'));
  
  //To check if the requested path needs authentication
  const AuthRoute = (props)=>{
    
      if((!localStorage.getItem('LOGINDATA'))){
        return <Redirect to="/login" />
      }else{
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
  }, [])
  return(
 
    <Suspense fallback={<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><p>Loading...</p></div>}>
      <Switch>
      <AuthRoute {...props} exact path='/' component={()=>{}}/>
      <Route {...props} exact path='/login' component={Login}/>   {/* Dont use AuthRoute here. Will lead to infinite loop */}
      <AuthRoute {...props} exact path='/dashboard' component={Dashboard}/>
      <AuthRoute path="/"  />
    </Switch>
    </Suspense>

  )
  }

export default  (Main)

import { h, Component } from 'preact';
import './style.scss'
import BaseView from '../Baseview/BaseView'
import Input from  '../Input/Input'
import Card from '../Card/Card';
import Icon from '../../assets/qr_icon.png'
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import apiRequest from '../../api/apiRequest';
import {Observer, inject} from 'mobx-react';
import Loader from '../Loader/Loader';

function Login(props) {
    return(
        
            <Observer>
                {()=>(
                    <div className="one-flex align-center full-height">
                <Card classname="flex align-center" style={{height:350, width:320}}>
                    <div className=" padding-lg" >
                        <div className="flex align-center margin-bottom-lg">
                            <img src={Icon} className="image-icon" />
                        </div>
                        <form onSubmit={e => { e.preventDefault(); }} action="POST">
                            <div>
                                <Input placeholder="Username" name="username" value={props.loginStore.username} onChange={({target})=>{props.loginStore.errorMessage = '';props.loginStore.username = target.value}} style={{width:200}}/>
                            </div>
                            <div className="margin-top-lg">
                                <Input placeholder="Password" name="password" type="password" value={props.loginStore.password} onChange={({target})=>{props.loginStore.errorMessage = '';props.loginStore.password = target.value}} style={{width:200}}/>
                            </div>
                            <div className="margin-top-lg flex align-center">
                                <Button type="button" disabled={props.loginStore.isLoading || (!props.loginStore.username || !props.loginStore.password)}  onClick= {apiRequest.apiDebounce(props.loginStore.handleLogin)} text="Submit" type={AppConstant.POSITIVE}/>
                            </div>
                        </form>
                        <p className="error-message">
                            {props.loginStore.errorMessage}
                        </p>
                        {
                            props.loginStore.isLoading? <Loader style={{height:30}}/>:null
                        }
                    </div>
                </Card>
            </div>
                )}
            </Observer>
            
        
    )
    
}
export default inject('loginStore')(Login)

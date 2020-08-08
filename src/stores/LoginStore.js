import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import {subscribeApi} from '../notif';

export default class LoginStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    setIsLoading(value){
        this.isLoading = value;
    }

    @action handleLogin = async()=>{
        this.errorMessage = ''
        if(!this.username || !this.password){
            this.errorMessage = 'Please enter username and password';
            return
        }
        const param = {
            username: this.username,
            password: this.password
        }
        this.setIsLoading(true)
        const response = await apiRequest.callAPIs(apiRequest.loginSubmit(param))
        if(response.status === apiRequest.STATUS.SUCCESS){
            BaseStore.LOGINDATA = response.data;
            localStorage.setItem('LOGINDATA', JSON.stringify(response.data))
            Navigation.replace('/')
            subscribeApi()
        }else{
            BaseStore.LOGINDATA = null
            localStorage.removeItem('LOGINDATA')
            this.errorMessage = ('Username or Password is incorrect')
        }
        this.setIsLoading(false)
        
    }
    
}
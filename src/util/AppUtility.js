import BaseStore from '../Stores/BaseStore'

const getToken = ()=>{
    if(localStorage.getItem('LOGINDATA')){
        BaseStore.LOGINDATA = JSON.parse(localStorage.getItem('LOGINDATA'))
    }
    if(BaseStore.LOGINDATA){
        // return BaseStore.LOGINDATA.access_token
        return BaseStore.LOGINDATA.token
    }
    else{
        return ''
    }
}

export default {
    getToken
}
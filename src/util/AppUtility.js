import BaseStore from '../Stores/BaseStore'
import apiRequest from '../api/apiRequest'

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

const imageUpload = async(file)=>{
    try {
        const form_data = new FormData();
        const file_data = file;
        form_data.append("file", file_data);
        const response = await apiRequest.uploadImage(form_data)
        return response
    } catch (error) {
        console.log(error.toString());
    }
    
}

export default {
    getToken,
    imageUpload
}
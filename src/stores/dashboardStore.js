import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import check from '../assets/check.png'
import error from '../assets/error.png'
import {checkAndRequestNotif, subscribeApi} from '../notif';

export default class DashboardStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    @observable restaurantData = {};
    copyOfRestaurantData = {}
    @observable logoLoading = false;
    @observable toastMessage = [];
    @observable apiLoading = false;
    @observable photoLoading = false;
    setIsLoading(value){
        this.isLoading = value;
    }
    @action handleRestaurantUpdate= async()=>{
        this.apiLoading = true;
        try {
            const response = await apiRequest.postRestaurantDetail(this.restaurantData)
        if(response.status === apiRequest.STATUS.SUCCESS){
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Success",
                    description: "Updated Successfully",
                    backgroundColor: "#0cb88f",
                    icon: check,
                },
            ]
        }else{
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Failure",
                    description: "Something Went Wrong",
                    backgroundColor: "#fd3753",
                    icon: error,
                },
            ]
        }
        this.apiLoading = false
        } catch (error) {
            this.apiLoading = false
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Failure",
                    description: "Something Went Wrong",
                    backgroundColor: "#fd3753",
                    icon: error,
                },
            ]
        }
        
    }
    @action handleImgaeUpload = async(target)=>{
        try {
            this.logoLoading = true;
            const form_data = new FormData();
            const file_data = target.files[0];
            form_data.append("file", file_data);
            const response = await apiRequest.uploadImage(form_data)
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.restaurantData.logo =  response.data.filename;
                this.toastMessage = [
                    {
                        id: Date.now(),
                        title: "Success",
                        description: "Updated Successfully",
                        backgroundColor: "#0cb88f",
                        icon: check,
                    },
                ]
            }else{
                this.toastMessage = [
                    {
                        id: Date.now(),
                        title: "Failure",
                        description: "Something Went Wrong",
                        backgroundColor: "#fd3753",
                        icon: error,
                    },
                ]
            }
            this.logoLoading = false
        } catch (error) {
            this.logoLoading = false
        }
        
    }

    @action imageUpload = async(file)=>{
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
    @action addPhotosOfRestaurant = async (target)=>{
        this.photoLoading = true;
        for(let i=0; i<target.files.length;i++){
            const response = await this.imageUpload(target.files[i])
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.restaurantData.images = [...this.restaurantData.images, response.data.filename];
                this.restaurantData = {...this.restaurantData}
            }
        }
        this.photoLoading = false;
    }
    @action getRestauarantDetails =async ()=>{
        try {
            this.isLoading = true
            const response = await apiRequest.getRestaurantDetails();
            if(response.status === apiRequest.STATUS.SUCCESS){
                response.data.response.images = response.data.response.images.filter(image => image)
                this.restaurantData = response.data.response
                this.copyOfRestaurantData = response.data.response
                if(!this.copyOfRestaurantData.name){
                    Navigation.push('/restaurant')
                }
            }else{

            }
            this.isLoading = false    
        } catch (error) {
            this.isLoading = false
        }
        
    }
    
    @action handleNotif = async()=>{
        const notifStatus = checkAndRequestNotif();
        if(notifStatus === 'DENIED'){
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Notifications blocked",
                    description: "Notifications blocked. Please enable them. ",
                    backgroundColor: "#fd3753",
                    icon: error,
                },
            ]
        }
        // if(!JSON.parse(localStorage.LOGINDATA).user.notif){
        //     subscribeApi()
        // }
    }
    
}
import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import check from '../assets/check.svg'
import error from '../assets/error.svg'

export default class QrcodeStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    @observable numberOfqrcodes = '';
    @observable generateQrcodesLoader = false;
    @observable typerOfqrcodes = ''
    @observable toastMessage = []
    @observable qrcodes = [];
    setIsLoading(value){
        this.isLoading = value;
    }
    @action getQrCodes = async(loader= true)=>{
        
        try {
            if(loader){
                this.isLoading = true;
            }
            const response = await apiRequest.getQrcodes();
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.qrcodes = response.data.qrcodes;
            }
            if(loader){
                this.isLoading = false;
            }
            
        } catch (error) {
            if(loader){
                this.isLoading = false;
            }
            
        }
    }
    @action onqrcodechange = (valIndex)=>{
        if(valIndex === 'ALL'){
            this.qrcodes = this.qrcodes.map(item=>{
                item.selected = true
                return item;
            }
            )
        }else{
            this.qrcodes = this.qrcodes.map((item, index)=>{
                if(valIndex === index){
                    item.selected = !item.selected
                }
                return item;
            }
            )
        }
    }
    @action generateQrcodes = async()=>{
        try {
            this.generateQrcodesLoader = true
            const json = {
                name: this.typerOfqrcodes,
                numberOfqrcodes: this.numberOfqrcodes
            }
            const response = await apiRequest.generateQrcode(json)
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
            this.generateQrcodesLoader = false
        } catch (error) {
            this.generateQrcodesLoader = false
        }
    }
    
    
}
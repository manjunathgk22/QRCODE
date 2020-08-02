import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import check from '../assets/check.png'
import error from '../assets/error.png'
import {toDataURL} from 'qrcode';
import {toString} from 'lodash';

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
    @observable menus =[];
    @observable services = []
    @observable tempMenuSelect = '';
    @observable tempServiceSelect = '';
    @observable tempQrcodeSelect = ''
    @observable showMenuConfirm = false
    @observable showServiceConfirm = false
    @observable apiLoading = false
    setIsLoading(value){
        this.isLoading = value;
    }
    @action getQrCodes = async(loader= true, generateDataUrl = false)=>{
        
        try {
            if(loader){
                this.isLoading = true;
            }
            const response = await apiRequest.getDetailedQrcodes();
            if(response.status === apiRequest.STATUS.SUCCESS){
                let qrcodes = response.data.qrcodes;
                if(generateDataUrl){
                    for(let i=0,length= qrcodes.length;i<length;i++){
                        qrcodes[i].dataUrl = await toDataURL(toString(qrcodes[0].id));
                    }
                }
                
                this.qrcodes = qrcodes;
                this.menus = response.data.menus;
                this.services = response.data.services
            }
            if(loader){
                this.isLoading = false;
            }
            
        } catch (error) {
            console.log(error)
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
    
    @action handleMenuSelect = (menu, qrcode)=>{
        this.tempMenuSelect = menu;
        this.tempQrcodeSelect = qrcode;
        this.showMenuConfirm = true;
    }
    @action handleServiceSelect = (service, qrcode)=>{
        debugger
        this.tempServiceSelect = service;
        this.tempQrcodeSelect = qrcode;
        this.showServiceConfirm = true;
    }
    @action handleMenuChange = async()=>{
        try {
            this.apiLoading = true;
            const json = {
                qrcode_id: this.tempQrcodeSelect.id,
                menu_id : this.tempMenuSelect.id
            }
            const response = await apiRequest.callAPIs(apiRequest.updateQrcodeMenu(json))
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.qrcodes = this.qrcodes.map(qrcode =>{
                    if(qrcode.id === this.tempQrcodeSelect.id){
                        qrcode.menu = this.tempMenuSelect
                    }
                    return qrcode
                })
                this.tempMenuSelect = '';
                this.tempQrcodeSelect = '';
                this.toastMessage = [
                    {
                        id: Date.now(),
                        title: "Success",
                        description: "Updated Successfully",
                        backgroundColor: "#0cb88f",
                        icon: check,
                    },
                ]
                this.showMenuConfirm = false;
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
            this.apiLoading = false;
        } catch (error) {
            console.log(error)
        }
    }
    @action handleServiceChange = async()=>{
        try {
            this.apiLoading = true;
            const json = {
                qrcode_id: this.tempQrcodeSelect.id,
                services_id : this.tempServiceSelect.id
            }
            const response = await apiRequest.callAPIs(apiRequest.updateQrcodeService(json))
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.qrcodes = this.qrcodes.map(qrcode =>{
                    if(qrcode.id === this.tempQrcodeSelect.id){
                        qrcode.service = this.tempServiceSelect
                    }
                    return qrcode
                })
                this.tempServiceSelect = '';
                this.tempQrcodeSelect = '';
                this.toastMessage = [
                    {
                        id: Date.now(),
                        title: "Success",
                        description: "Updated Successfully",
                        backgroundColor: "#0cb88f",
                        icon: check,
                    },
                ]
                this.showServiceConfirm = false;
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
            this.apiLoading = false;
        } catch (error) {
            console.log(error)
        }
    }

}
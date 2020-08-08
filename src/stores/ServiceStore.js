import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import check from '../assets/check.png'
import error from '../assets/error.png'
export default class ServiceStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    @observable serviceData = [];
    @observable showServiceAddPopup = false;
    @observable showServiceCategoryAddPopup = false
    @observable showServiceItemAddPopup = false
    @observable showServicesItemShowPopup = false

    // SHOW form data
    @observable showServiceShowPopup = false
    @observable showServiceCategoryShowPopup = false

    @observable serviceAddLoading = false;
    @observable photoLoading = false
    // ADD form data
    @observable serviceadd = {}
    @observable serviceaddCategory = {}
    @observable serviceaddItem = {}

    @observable toastMessage = [];
    @observable qrcodes = []
    @observable qrcodesCopy = []
    @observable qrcodesForpopup = []
    @observable selectedServiceIndex = 0;
    @observable selectedServiceCategoryIndex = 0; 
    qrstoreRef = null;
    setIsLoading(value){
        this.isLoading = value;
    }
    @action getData = async()=>{
        this.isLoading = true;
        try {
            await Promise.all([
                this.getservices(false),
                this.qrstoreRef.getQrCodes(false)
            ]);
            this.qrcodes = [...this.qrstoreRef.qrcodes]
            this.qrcodesCopy = [...this.qrstoreRef.qrcodes]
            // this.qrcodesForpopup = this.qrcodes.filter(qrcode => !qrcode.services_id)
            console.log(JSON.parse(JSON.stringify(this.qrcodesForpopup)))
        } catch(e){
            console.log(e.toString())
        }
        finally {
            this.isLoading = false;
        }
        
    }
    @action handleShowServiceAddpopup = ()=>{
        this.qrcodesForpopup = this.qrcodes.filter(qrcode => !qrcode.services_id)
        this.showServiceAddPopup = true
    }
    @action onqrcodechange = (valIndex)=>{
        if(valIndex === 'ALL'){
            this.qrcodesForpopup = this.qrcodesForpopup.map(item=>{
                item.selected = true
                return item;
            }
            )
        }else{
            this.qrcodesForpopup = this.qrcodesForpopup.map((item, index)=>{
                if(valIndex === index){
                    item.selected = !item.selected
                }
                return item;
            }
            )
        }
    }
    @action getservices = async(loader = true)=>{
        try {
            if(loader){
                this.isLoading = true;
            }
            const response = await apiRequest.getservices();
            if(response.status === apiRequest.STATUS.SUCCESS){
                // DEFAULT add selected to first element
                if(response.data.response.length){
                    response.data.response[0].selected = true
                    if(response.data.response[0].servicescategories.length){
                        response.data.response[0].servicescategories[0].selected = true
                        if(response.data.response[0].servicescategories[0].servicesitems.length){
                            // response.data.response[0].servicescategories[0].servicesitems[0].selected = true
                        }
                    }
                    
                }

                this.serviceData = response.data.response;
                
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
            if(loader){
                this.isLoading = false;
            }
            
        } catch (error) {
            console.log(error.toString())
            if(loader){
                this.isLoading = false;
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
    }

    @action handleServiceAdd = async(fromUpdate = false)=>{
        try {
            let json = {
                name: this.serviceadd.name,
                qrcode: this.qrcodesForpopup.filter(qrcode => qrcode.selected).map(item => item.id),
                id: this.serviceadd ? this.serviceadd.id : ''
            }

            this.serviceAddLoading = true;
            let response = null
            if(fromUpdate){
                json.qrcode = this.qrcodesForpopup
                response = await apiRequest.updateService(json)
            }else{
                response = await apiRequest.createService(json)
            }
            if(!fromUpdate){
                if(response.status === apiRequest.STATUS.SUCCESS){
                    if(!response.data.response.servicescategories){
                        response.data.response.servicescategories=[]   
                    }
                    this.serviceData = [...this.serviceData, response.data.response]
                    if(this.serviceData.length === 1){
                        this.serviceData[0].selected = true;
                    }
                    
    
                    // UPDATE MENU ID of qrcodes
                    this.qrcodes = this.qrcodes.map(qrcode =>{
                        this.qrcodesForpopup.some(qrcodePopup =>{
                            if(qrcodePopup.selected && qrcodePopup.id === qrcode.id){
                                qrcode.services_id = response.data.response.id
                                return true;
                            }
                            return false
                        })
                        return qrcode
                    })
                    this.qrcodesForpopup = this.qrcodesForpopup.filter(qrcode => !qrcode.services_id)
    
                    this.showServiceAddPopup = false
                }else{
    
                }
            }else{
                this.qrcodes = this.qrcodes.map(qrcode =>{
                    this.qrcodesForpopup.some(qrcodePopup =>{
                        if(qrcodePopup.id === qrcode.id){
                            if(qrcodePopup.selected)
                                qrcode.services_id = response.data.response.id
                            else
                                qrcode.services_id = null
                            return true;
                        }
                        return false
                    })
                    return qrcode
                })
                this.showServiceShowPopup = false;
                this.toastMessage = [
                    {
                        id: Date.now(),
                        title: "Success",
                        description: "Updated Successfully",
                        backgroundColor: "#0cb88f",
                        icon: check,
                    },
                ]
            }
            
            this.serviceAddLoading = false;
        } catch (error) {
            this.serviceAddLoading = false;
        }
    }

    

    @action handleCardClick = (type, index)=>{
        switch(type){
            case 'MENU':
                this.serviceData = this.serviceData.map((service, i)=>{
                    if(i === index){
                        this.selectedServiceIndex = index;
                        this.selectedServiceCategoryIndex = 0;
                    }else{
                        
                    }
                    return service
                })
                break;
            case 'MENUCATEGORY':
                this.serviceData[this.selectedServiceIndex].servicescategories.map((service, i)=>{
                    if(i === index){
                        
                        this.selectedServiceCategoryIndex = index;
                    }else{
                        
                    }
                })
                this.serviceData = [...this.serviceData]
                break;
            case 'MENUITEM':
                // this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems.map((service, i)=>{
                //     if(i === index){
                        
                //         this.selectedServiceCategoryIndex = index;
                //     }else{
                        
                //     }
                // })
                // this.serviceData = [...this.serviceData]
                break;
        }
    }
    
    @action createServiceCategory = async(fromUpdate)=>{
        try {
            let json = {
                name: this.serviceaddCategory.name,
                description: this.serviceaddCategory.description,
                service_id: this.serviceData[this.selectedServiceIndex].id,
                id: this.serviceaddCategory.id
            }
            
            this.serviceAddLoading = true;
            let response = null
            if(fromUpdate){
                response = await apiRequest.updateServiceCategory(json);
                if(response.status === apiRequest.STATUS.SUCCESS){
                    this.serviceData[this.selectedServiceIndex].servicescategories = this.serviceData[this.selectedServiceIndex].servicescategories.map(category =>{
                        if(category.id === response.data.response.id){
                            category.name = response.data.response.name
                            category.description = response.data.response.description
                        }
                        return category;
                    })
                    this.serviceData = [...this.serviceData]
                    this.showServiceCategoryShowPopup = false;
                    this.toastMessage = [
                        {
                            id: Date.now(),
                            title: "Success",
                            description: "Updated Successfully",
                            backgroundColor: "#0cb88f",
                            icon: check,
                        },
                    ]
                }
            }
                
            else{
                response = await apiRequest.createServiceCategory(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    if(!response.data.response.servicesitems){
                        response.data.response.servicesitems = []
                    }
                    this.serviceData[this.selectedServiceIndex].servicescategories = [...this.serviceData[this.selectedServiceIndex].servicescategories, response.data.response]
                    this.serviceData = [...this.serviceData]
    
                    this.showServiceCategoryAddPopup = false
                }else{
    
                }
                this.serviceAddLoading = false;
            }
                
            
            
        } catch (error) {
            this.serviceAddLoading = false;
        }
    }

    @action createServiceitem = async(fromUpdate)=>{
        try {
            let json = {
                name: this.serviceaddItem.name,
                description: this.serviceaddItem.description,
                cost: +this.serviceaddItem.cost,
                images: this.serviceaddItem.images || [],
                service_category_id: this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].id
            }
            
            this.serviceAddLoading = true;
            let response = null;
            if(fromUpdate){
                json.id = this.serviceaddItem.id;
                response = await apiRequest.updateServiceItem(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    
                    this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems = this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems.map(item =>{
                        if(item.id === this.serviceaddItem.id){
                            return response.data.response;
                        }else{
                            return item
                        }
                    })
                    this.serviceData = [...this.serviceData]
                }
                this.showServicesItemShowPopup = false
            }else{
                response = await apiRequest.createServiceItem(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems = [...this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems, response.data.response]
                    this.serviceData = [...this.serviceData]
    
                    this.showServiceItemAddPopup = false
                
                }else{
    
                }
            }
            
            
            this.serviceAddLoading = false;
        } catch (error) {
            this.serviceAddLoading = false;
        }
    }

    @action addPhotosofServiceItem = async (target)=>{
        this.photoLoading = true;
        if(!this.serviceaddItem.images){
            this.serviceaddItem.images = []
        }
        for(let i=0; i<target.files.length;i++){
            const response = await AppUtility.imageUpload(target.files[i])
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.serviceaddItem.images = [...this.serviceaddItem.images, response.data.filename];
                this.serviceaddItem = {...this.serviceaddItem}
            }
        }
        this.photoLoading = false;
    }

    @action handleShowServicePopup = (index)=>{
        this.qrcodesForpopup = this.qrcodes.filter(qrcode => {
            if(qrcode.services_id === this.serviceData[index].id){
                qrcode.selected = true;
                return true
            }else if(!qrcode.services_id){
                return true;
            }
        })
        this.serviceadd = {name:this.serviceData[index].name, id: this.serviceData[index].id}
        this.showServiceShowPopup = true;
    }
    @action handleShowServiceCategoryPopup = (index)=>{
        this.serviceaddCategory = {
            name: this.serviceData[this.selectedServiceIndex].servicescategories[index].name,
            id: this.serviceData[this.selectedServiceIndex].servicescategories[index].id,
            description: this.serviceData[this.selectedServiceIndex].servicescategories[index].description
        }
        this.showServiceCategoryShowPopup = true
    }

    @action handleShowServiceItemPopup = (index)=>{
        this.serviceaddItem = {
            name: this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems[index].name,
            id: this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems[index].id,
            description: this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems[index].description,
            cost: +this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems[index].cost,
            images: this.serviceData[this.selectedServiceIndex].servicescategories[this.selectedServiceCategoryIndex].servicesitems[index].images
        }
        this.showServicesItemShowPopup = true
    }
}
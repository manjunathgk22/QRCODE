import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import check from '../assets/check.png'
import error from '../assets/error.png'
export default class MenuStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    @observable menuData = [];
    @observable showMenuAddPopup = false;
    @observable showMenuCategoryAddPopup = false
    @observable showMenuItemAddPopup = false
    @observable showMenuItemShowPopup = false

    // SHOW form data
    @observable showMenuShowPopup = false
    @observable showMenuCategoryShowPopup = false

    @observable menuAddLoading = false;
    @observable photoLoading = false
    // ADD form data
    @observable menuadd = {}
    @observable menuaddCategory = {}
    @observable menuaddItem = {}

    @observable toastMessage = [];
    @observable qrcodes = []
    @observable qrcodesCopy = []
    @observable qrcodesForpopup = []
    @observable selectedMenuIndex = 0;
    @observable selectedMenuCategoryIndex = 0; 
    qrstoreRef = null;
    setIsLoading(value){
        this.isLoading = value;
    }
    @action getData = async()=>{
        this.isLoading = true;
        try {
            await Promise.all([
                this.getmenus(false),
                this.qrstoreRef.getQrCodes(false)
            ]);
            this.qrcodes = [...this.qrstoreRef.qrcodes]
            this.qrcodesCopy = [...this.qrstoreRef.qrcodes]
            // this.qrcodesForpopup = this.qrcodes.filter(qrcode => !qrcode.menu_id)
            console.log(JSON.parse(JSON.stringify(this.qrcodesForpopup)))
        } finally {
            this.isLoading = false;
        }
        
    }
    @action handleShowMenuAddpopup = ()=>{
        this.qrcodesForpopup = this.qrcodes.filter(qrcode => !qrcode.menu_id)
        this.showMenuAddPopup = true
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
    @action getmenus = async(loader = true)=>{
        try {
            if(loader){
                this.isLoading = true;
            }
            const response = await apiRequest.getmenus();
            if(response.status === apiRequest.STATUS.SUCCESS){
                // DEFAULT add selected to first element
                if(response.data.response.length){
                    response.data.response[0].selected = true
                    if(response.data.response[0].menucategories.length){
                        response.data.response[0].menucategories[0].selected = true
                        if(response.data.response[0].menucategories[0].menuitems.length){
                            // response.data.response[0].menucategories[0].menuitems[0].selected = true
                        }
                    }
                    
                }

                this.menuData = response.data.response;
                
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

    @action handleMenuAdd = async(fromUpdate = false)=>{
        try {
            let json = {
                name: this.menuadd.name,
                qrcode: this.qrcodesForpopup.filter(qrcode => qrcode.selected).map(item => item.id),
                id: this.menuadd ? this.menuadd.id : ''
            }

            this.menuAddLoading = true;
            let response = null
            if(fromUpdate){
                json.qrcode = this.qrcodesForpopup
                response = await apiRequest.updateMenu(json)
            }else{
                response = await apiRequest.createMenu(json)
            }
            if(!fromUpdate){
                if(response.status === apiRequest.STATUS.SUCCESS){
                    if(!response.data.response.menucategories){
                        response.data.response.menucategories=[]   
                    }
                    this.menuData = [...this.menuData, response.data.response]
                    if(this.menuData.length === 1){
                        this.menuData[0].selected = true;
                    }
                    
    
                    // UPDATE MENU ID of qrcodes
                    this.qrcodes = this.qrcodes.map(qrcode =>{
                        this.qrcodesForpopup.some(qrcodePopup =>{
                            if(qrcodePopup.selected && qrcodePopup.id === qrcode.id){
                                qrcode.menu_id = response.data.response.id
                                return true;
                            }
                            return false
                        })
                        return qrcode
                    })
                    this.qrcodesForpopup = this.qrcodesForpopup.filter(qrcode => !qrcode.menu_id)
    
                    this.showMenuAddPopup = false
                }else{
    
                }
            }else{
                this.qrcodes = this.qrcodes.map(qrcode =>{
                    this.qrcodesForpopup.some(qrcodePopup =>{
                        if(qrcodePopup.id === qrcode.id){
                            if(qrcodePopup.selected)
                                qrcode.menu_id = response.data.response.id
                            else
                                qrcode.menu_id = null
                            return true;
                        }
                        return false
                    })
                    return qrcode
                })
                this.showMenuShowPopup = false;
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
            
            this.menuAddLoading = false;
        } catch (error) {
            this.menuAddLoading = false;
        }
    }

    

    @action handleCardClick = (type, index)=>{
        switch(type){
            case 'MENU':
                this.menuData = this.menuData.map((menu, i)=>{
                    if(i === index){
                        this.selectedMenuIndex = index;
                        this.selectedMenuCategoryIndex = 0;
                    }else{
                        
                    }
                    return menu
                })
                break;
            case 'MENUCATEGORY':
                this.menuData[this.selectedMenuIndex].menucategories.map((menu, i)=>{
                    if(i === index){
                        
                        this.selectedMenuCategoryIndex = index;
                    }else{
                        
                    }
                })
                this.menuData = [...this.menuData]
                break;
            case 'MENUITEM':
                // this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems.map((menu, i)=>{
                //     if(i === index){
                        
                //         this.selectedMenuCategoryIndex = index;
                //     }else{
                        
                //     }
                // })
                // this.menuData = [...this.menuData]
                break;
        }
    }
    
    @action createMenuCategory = async(fromUpdate)=>{
        try {
            let json = {
                name: this.menuaddCategory.name,
                description: this.menuaddCategory.description,
                menu_id: this.menuData[this.selectedMenuIndex].id,
                id: this.menuaddCategory.id
            }
            
            this.menuAddLoading = true;
            let response = null
            if(fromUpdate){
                response = await apiRequest.updateMenuCategory(json);
                if(response.status === apiRequest.STATUS.SUCCESS){
                    this.menuData[this.selectedMenuIndex].menucategories = this.menuData[this.selectedMenuIndex].menucategories.map(category =>{
                        if(category.id === response.data.response.id){
                            category.name = response.data.response.name
                            category.description = response.data.response.description
                        }
                        return category;
                    })
                    this.menuData = [...this.menuData]
                    this.showMenuCategoryShowPopup = false;
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
                response = await apiRequest.createMenuCategory(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    if(!response.data.response.menuitems){
                        response.data.response.menuitems = []
                    }
                    this.menuData[this.selectedMenuIndex].menucategories = [...this.menuData[this.selectedMenuIndex].menucategories, response.data.response]
                    this.menuData = [...this.menuData]
    
                    this.showMenuCategoryAddPopup = false
                }else{
    
                }
                this.menuAddLoading = false;
            }
                
            
            
        } catch (error) {
            this.menuAddLoading = false;
        }
    }

    @action createMenuitem = async(fromUpdate)=>{
        try {
            let json = {
                name: this.menuaddItem.name,
                description: this.menuaddItem.description,
                cost: +this.menuaddItem.cost,
                images: this.menuaddItem.images || [],
                menu_category_id: this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].id
            }
            
            this.menuAddLoading = true;
            let response = null;
            if(fromUpdate){
                json.id = this.menuaddItem.id;
                response = await apiRequest.updateMenuItem(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    
                    this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems = this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems.map(item =>{
                        if(item.id === this.menuaddItem.id){
                            return response.data.response;
                        }else{
                            return item
                        }
                    })
                    this.menuData = [...this.menuData]
                }
                this.showMenuItemShowPopup = false
            }else{
                response = await apiRequest.createMenuItem(json)
                if(response.status === apiRequest.STATUS.SUCCESS){
                    this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems = [...this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems, response.data.response]
                    this.menuData = [...this.menuData]
    
                    this.showMenuItemAddPopup = false
                
                }else{
    
                }
            }
            
            
            this.menuAddLoading = false;
        } catch (error) {
            this.menuAddLoading = false;
        }
    }

    @action addPhotosofMenuItem = async (target)=>{
        this.photoLoading = true;
        if(!this.menuaddItem.images){
            this.menuaddItem.images = []
        }
        for(let i=0; i<target.files.length;i++){
            const response = await AppUtility.imageUpload(target.files[i])
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.menuaddItem.images = [...this.menuaddItem.images, response.data.filename];
                this.menuaddItem = {...this.menuaddItem}
            }
        }
        this.photoLoading = false;
    }

    @action handleShowMenuPopup = (index)=>{
        this.qrcodesForpopup = this.qrcodes.filter(qrcode => {
            if(qrcode.menu_id === this.menuData[index].id){
                qrcode.selected = true;
                return true
            }else if(!qrcode.menu_id){
                return true;
            }
        })
        this.menuadd = {name:this.menuData[index].name, id: this.menuData[index].id}
        this.showMenuShowPopup = true;
    }
    @action handleShowMenuCategoryPopup = (index)=>{
        this.menuaddCategory = {
            name: this.menuData[this.selectedMenuIndex].menucategories[index].name,
            id: this.menuData[this.selectedMenuIndex].menucategories[index].id,
            description: this.menuData[this.selectedMenuIndex].menucategories[index].description
        }
        this.showMenuCategoryShowPopup = true
    }

    @action handleShowMenuItemPopup = (index)=>{
        this.menuaddItem = {
            name: this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems[index].name,
            id: this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems[index].id,
            description: this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems[index].description,
            cost: +this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems[index].cost,
            images: this.menuData[this.selectedMenuIndex].menucategories[this.selectedMenuCategoryIndex].menuitems[index].images
        }
        this.showMenuItemShowPopup = true
    }
}
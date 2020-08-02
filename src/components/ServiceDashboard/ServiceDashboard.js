import { h, Component } from 'preact';
import BaseView from '../Baseview/BaseView';
import {useEffect} from 'preact/hooks'
import {Observer, inject} from 'mobx-react';
import Card from '../Card/Card';
import DetailsLoader from '../SkeletonLoaders/DetailsLoader'
import './Style.scss'
import Eye from '../../assets/eye.svg'
import Toast from '../Toast/Toast';
import ServiceAddPopup from '../ServiceDashboard/ServiceAddPopup'
import ServiceCategoryAddPopup from '../ServiceDashboard/ServiceCategoryAddPopup';
import ServiceItemAddPopup from '../ServiceDashboard/ServiceItemAddPopup';
import ServiceCategoryShowPopup from '../ServiceDashboard/ServiceCategoryShowPopup';
import ServiceItemShowPopup from '../ServiceDashboard/ServiceItemShowPopup';
import ServiceShowPopup from '../ServiceDashboard/ServiceShowPopup'
const ServiceDashboard = (props) => {
    useEffect(() => {
        props.serviceStore.qrstoreRef = props.qrcodeStore
        // props.serviceStore.getservices()
        props.serviceStore.getData()
    }, [])
    return (
        <BaseView>
        {
            <Observer>{()=>(
                <div className="padding-lg service-dashboard">
                    <Card classname="padding-lg">
                        {
                            props.serviceStore.isLoading ?<DetailsLoader/>:
                            <div className="flex">
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Service</h4>
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{ props.serviceStore.handleShowServiceAddpopup()}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Service</p>
                                    <div className="service-column">
                                    {
                                        props.serviceStore.serviceData.map((service, index) =><Card onClick={()=>{props.serviceStore.handleCardClick('MENU', index)}} classname={`padding-md margin-bottom-md shadow-light servicecard ${index === props.serviceStore.selectedServiceIndex? 'active':''}`}>
                                            
                                            <div className="flex space-between margin-top-sm ">
                                                
                                                <Eye onClick={()=>{props.serviceStore.handleShowServicePopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {service.name}
                                                </div>
                                                <span className="font-12 text">
                                                    {`${service.servicescategories.length} ${service.servicescategories.length>1? 'Categories': 'Category'}`}
                                                </span>
                                            </div>
                                        </Card>)
                                    }
                                    </div>
                                    
                                </div>
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Service Category</h4>
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{props.serviceStore.serviceaddCategory = {}; props.serviceStore.showServiceCategoryAddPopup = true}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Service Category</p>
                                    <div className="service-column">
                                        
                                    {
                                        props.serviceStore.serviceData.length && props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex] && props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories.length ? props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories.map((serviceCategory, index) =><Card onClick={()=>{props.serviceStore.handleCardClick("MENUCATEGORY", index)}} classname={`padding-md margin-bottom-md shadow-light servicecard ${index === props.serviceStore.selectedServiceCategoryIndex? 'active':''}`}>
                                            <div className="flex space-between margin-top-sm ">
                                                <Eye onClick={()=>{props.serviceStore.handleShowServiceCategoryPopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {serviceCategory.name}
                                                </div>
                                                <span className="font-12 text">
                                                    {`${serviceCategory.servicesitems.length} ${serviceCategory.servicesitems.length>1? 'Items': 'Item'}`}
                                                    
                                                </span>
                                            </div>
                                        </Card>) : null
                                    }
                                    </div>
                                    
                                </div>
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Service Item</h4> 
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{props.serviceStore.serviceaddItem = {};  props.serviceStore.showServiceItemAddPopup = true}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Service Item</p>
                                    <div className="service-column">
                                    {
                                        props.serviceStore.serviceData.length && props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories.length &&  props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories[props.serviceStore.selectedServiceCategoryIndex].servicesitems && props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories[props.serviceStore.selectedServiceCategoryIndex].servicesitems ? props.serviceStore.serviceData[props.serviceStore.selectedServiceIndex].servicescategories[props.serviceStore.selectedServiceCategoryIndex].servicesitems.map((serviceItem, index) =><Card onClick={()=>{props.serviceStore.handleCardClick('MENUITEM', index)}} classname={`padding-md margin-bottom-md shadow-light servicecard ${serviceItem.selected? 'active':''}`}>
                                            <div className="flex space-between margin-top-sm ">
                                                <Eye onClick={()=>{props.serviceStore.handleShowServiceItemPopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {serviceItem.name}
                                                </div>
                                            </div>
                                        </Card>) : null
                                    }
                                    </div>
                                    
                                </div>
                            </div>
                        }
                        <Toast toastList={props.serviceStore.toastMessage} />
                    </Card>
                    {/* MENU ADD POPUP */}
                    {props.serviceStore.showServiceAddPopup ?<ServiceAddPopup {...props}/>:null}

                    {/* MENU CATEGORY POPUP */}
                    {props.serviceStore.showServiceCategoryAddPopup? <ServiceCategoryAddPopup {...props} /> :null}

                    {/* MENU ITEM POPUP */}
                    {props.serviceStore.showServiceItemAddPopup?<ServiceItemAddPopup {...props} />:null}

                    {/* MENU SHOW POPUP */}
                    {props.serviceStore.showServiceShowPopup ?<ServiceShowPopup isShowPopup={true} {...props}/>:null}

                    {/* MENU CATEGORY SHOW POPUP */}
                    {props.serviceStore.showServiceCategoryShowPopup ?<ServiceCategoryShowPopup isShowPopup={true} {...props}/>:null}

                    {/* MENU ITEM SHOW POPUP */}
                    {props.serviceStore.showServicesItemShowPopup ?<ServiceItemShowPopup isShowPopup={true} {...props}/>:null}

                </div>
            )}</Observer>
        }
        </BaseView>
        
    );
};

export default inject('serviceStore', 'qrcodeStore') (ServiceDashboard);
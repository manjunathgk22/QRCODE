import { h, Component } from 'preact';
import { Suspense, lazy, useEffect } from 'preact/compat';
import {inject, Observer} from 'mobx-react';
import BaseView from '../Baseview/BaseView';
import './Style.scss'
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import apiRequest from '../../api/apiRequest';
import AppConstant from '../../constant/AppConstant';
import Loader from '../Loader/Loader';
import Toast from '../Toast/Toast';
import cameraicon from '../../assets/camera-icon.png'
import DetailsLoader from '../SkeletonLoaders/DetailsLoader'
const Restaurant = (props) => {
    useEffect(() => {
        if(!props.dashboardStore.restaurantData.name){
            props.dashboardStore.getRestauarantDetails()
        }
    }, [])
    return (
        <BaseView>
        <Observer>
            {()=>(
            
            <div className="padding-lg restaurant-wrapper">
                <Card>
                    <div className="padding-lg " >
                        {
                            props.dashboardStore.isLoading?
                            <DetailsLoader/>:
                            <form onSubmit={e => { e.preventDefault(); }} >
                            <div className="flex align-items-center margin-bottom-lg" style={{justifyContent:'space-between'}}>
                                <div className="flex">
                                    <div className="margin-right-md flex min-width-200" >Name:</div>
                                    <Input placeholder="Enter Name" name="name" onChange={({target})=>{props.dashboardStore.restaurantData.name = target.value}}  value={props.dashboardStore.restaurantData.name} style={{width:200}}/>
                                </div>

                                {
                                        <div className="relative">
                                        <img src={`__STATIC__${props.dashboardStore.restaurantData.logo}`} className={`${props.dashboardStore.restaurantData.logo? 'logo-image': 'none'}`}/>
                                        {
                                            <div className="flex absolute camera-icon"  style={{display: props.dashboardStore.restaurantData.logo? 'inline-block': 'none'}}>
                                                <img src={cameraicon} />
                                                <input onChange={({target})=>{props.dashboardStore.handleImgaeUpload(target)}} accept="image/x-png,image/gif,image/jpeg" type="file" style={{height:24, width:24, position:'absolute', opacity:0}}></input>
                                            </div>
                                        }
                                        <div className={`relative ${props.dashboardStore.restaurantData.logo? 'logo': ''}`} >
                                            <div className="flex align-center upload-style"> 
                                                {
                                                    props.dashboardStore.logoLoading? 
                                                    <Loader style={{height:50}}/>: 'Upload logo'
                                                }
                                            </div>
                                            <div>
                                                <input onChange={({target})=>{props.dashboardStore.handleImgaeUpload(target)}} accept="image/x-png,image/gif,image/jpeg" type="file" className="upload"></input>
                                            </div>
                                        </div>
                                        </div>
                                    }
                                
                            </div>
                            <div className="margin-top-lg flex align-items-center">
                                <div className="margin-right-md flex min-width-200" >Address:</div>
                                <Input  value={props.dashboardStore.restaurantData.address} onChange={({target})=>{props.dashboardStore.restaurantData.address = target.value}} placeholder="Enter Address" type="textArea" style={{maxWidth:550, maxHeight:120}}/>
                            </div>
                            <div className="margin-top-lg flex align-items-center">
                                <div className="margin-right-md flex min-width-200" >GSTID:</div>
                                <Input placeholder="Enter GSTID" onChange={({target})=>{props.dashboardStore.restaurantData.gstid = target.value}}  value={props.dashboardStore.restaurantData.gstid} style={{width:200}}/>
                            </div>
                            <div className="align-items-center">
                                <h3 className="no-bottom-margin margin-top-lg">Photo Gallery</h3>
                                <div>
                                    <div className={`relative`} >
                                        <div className="flex align-center upload-style left margin-top-md"> 
                                            {
                                                props.dashboardStore.photoLoading? 
                                                <Loader style={{height:50}}/>: <div><div className="text-center text-lg bold">+</div><div>Add photo</div></div>
                                            }
                                        </div>
                                        <div className="flex flex-wrap">
                                            <input onChange={({target})=>{props.dashboardStore.addPhotosOfRestaurant(target)}} accept="image/x-png,image/gif,image/jpeg" type="file" className="upload margin-right-md margin-top-md" multiple></input>
                                            {
                                                props.dashboardStore.restaurantData.images && props.dashboardStore.restaurantData.images.map(image=> <img src={`__STATIC__${image}`} className="gallery-image margin-right-md margin-top-md"/>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex align-center margin-top-lg padding-top-lg flex-column" >
                            <Button type="button" disabled={props.dashboardStore.isLoading || (!props.dashboardStore.restaurantData.name && !props.dashboardStore.restaurantData.address&& !props.dashboardStore.restaurantData.gstid)}  onClick= {apiRequest.apiDebounce(props.dashboardStore.handleRestaurantUpdate)} text="Submit" type={AppConstant.POSITIVE}/>
                            {
                                props.dashboardStore.apiLoading ? <Loader style={{height:50}}/>: null
                            }
                            </div>
                        </form>
                        }
                        
                    </div>
                </Card>
                <Toast toastList={props.dashboardStore.toastMessage} />
            </div>)}
        </Observer>
        </BaseView>
    );
};

export default inject('dashboardStore') (Restaurant);
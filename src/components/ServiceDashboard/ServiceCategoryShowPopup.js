import { h, Component } from 'preact';
import Modal from '../modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import apiRequest from '../../api/apiRequest';
import {Observer} from 'mobx-react';

const ServiceCategoryShowPopup = (props) => {
    return (
        <Observer>
            {()=>(
                <Modal onOverlayClick={()=>{props.serviceStore.showServiceCategoryShowPopup = false}}>
            <div className=" white-bg border-radius-sm modal-wrapper">
                <div className="flex space-between padding-bottom-sm padding-lg border-bottom">
                    <h3 className="text-center one-flex no-vertical-margin">Add Service Category</h3>
                    <span style={{fontSize:22}} className="pointer" onClick={()=>{props.serviceStore.showServiceCategoryShowPopup = false}}>X</span>
                </div>
                <div className="modal-body padding-lg">
                    <div className="flex ">
                        <div className="flex min-width-150" >Name:</div>
                        <Input placeholder="Enter name" value={props.serviceStore.serviceaddCategory.name} onChange={({target})=>{props.serviceStore.serviceaddCategory.name = target.value}} style={{width:200}}/>
                    </div>
                    <div className="flex margin-top-lg">
                        <div className="flex min-width-150" >Description:</div>
                        <Input placeholder="Enter Description" type="textArea" style={{width:300, maxWidth:400, maxHeight:250}} value={props.serviceStore.serviceaddCategory.description} onChange={({target})=>{props.serviceStore.serviceaddCategory.description = target.value}}/>
                    </div>
                    <div className="margin-top-lg flex align-center">
                        <Button type="button" disabled={props.serviceStore.serviceAddLoading || (!props.serviceStore.serviceaddCategory.name)}  onClick= { ()=>{props.serviceStore.createServiceCategory(true)}} text="Add" type={AppConstant.POSITIVE} />
                    </div>
                </div>
            </div>
        </Modal>
            )}
        </Observer>
        
    );
};

export default ServiceCategoryShowPopup;
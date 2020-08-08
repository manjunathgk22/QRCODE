import { h, Component } from 'preact';
import Modal from '../modal/Modal';
import DropdownMultiSelect from '../DropdownMulti/DropdownMultiSelect';
import Input from '../Input/Input';
import Button from '../Button/Button';
import apiRequest from '../../api/apiRequest';
import AppConstant from '../../constant/AppConstant';
import {Observer} from 'mobx-react';

const ServiceShowPopup = (props) => {
    return (
        <Observer>
            {()=>(
                <Modal onOverlayClick={()=>{props.serviceStore.showServiceAddPopup = false; props.serviceStore.showServiceShowPopup = false;}}>
                <div className=" white-bg border-radius-sm modal-wrapper">
                    <div className="flex space-between padding-bottom-sm padding-lg border-bottom">
                        <h3 className="text-center one-flex no-vertical-margin">Add Service</h3>
                        <span style={{fontSize:22}} className="pointer" onClick={()=>{props.serviceStore.showServiceAddPopup = false; props.serviceStore.showServiceShowPopup = false;}}>X</span>
                    </div>
                    <div className="modal-body padding-lg">
                        <div className="flex ">
                            <div className="flex min-width-150" >Name:</div>
                            <Input placeholder="Enter name" value={props.serviceStore.serviceadd.name} onChange={({target})=>{props.serviceStore.serviceadd.name = target.value}} style={{width:200}}/>
                        </div>
                        <div className=" flex margin-top-lg">
                            <div className="flex min-width-150" >Select Qrcode:</div>
                            <DropdownMultiSelect onChange = {props.serviceStore.onqrcodechange} options={props.serviceStore.qrcodesForpopup} />
                        </div>
                        <div className="margin-top-lg flex align-center">
                            <Button type="button" disabled={props.serviceStore.serviceAddLoading || (!props.serviceStore.serviceadd.name)}  onClick= { ()=>{ props.serviceStore.handleServiceAdd(true)}} text="Add" type={AppConstant.POSITIVE} />
                        </div>
                    </div>
                </div>
            </Modal>
            )}
        
        </Observer>
    );
};

export default ServiceShowPopup;
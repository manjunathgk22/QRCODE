import { h, Component } from 'preact';
import Modal from '../modal/Modal';
import DropdownMultiSelect from '../DropdownMulti/DropdownMultiSelect';
import Input from '../Input/Input';
import Button from '../Button/Button';
import apiRequest from '../../api/apiRequest';
import AppConstant from '../../constant/AppConstant';
import {Observer} from 'mobx-react';

const MenuAddPopup = (props) => {
    return (
        <Observer>
            {()=>(
                <Modal onOverlayClick={()=>{props.menuStore.showMenuAddPopup = false; props.menuStore.showMenuShowPopup = false;}}>
                <div className=" white-bg border-radius-sm modal-wrapper">
                    <div className="flex space-between padding-bottom-sm padding-lg border-bottom">
                        <h3 className="text-center one-flex no-vertical-margin">Add Menu</h3>
                        <span style={{fontSize:22}} className="pointer" onClick={()=>{props.menuStore.showMenuAddPopup = false; props.menuStore.showMenuShowPopup = false;}}>X</span>
                    </div>
                    <div className="modal-body padding-lg">
                        <div className="flex ">
                            <div className="flex min-width-150" >Name:</div>
                            <Input placeholder="Enter name" value={props.menuStore.menuadd.name} onChange={({target})=>{props.menuStore.menuadd.name = target.value}} style={{width:200}}/>
                        </div>
                        <div className=" flex margin-top-lg">
                            <div className="flex min-width-150" >Select Qrcode:</div>
                            <DropdownMultiSelect onChange = {props.menuStore.onqrcodechange} options={props.menuStore.qrcodesForpopup} />
                        </div>
                        <div className="margin-top-lg flex align-center">
                            <Button type="button" disabled={props.menuStore.menuAddLoading || (!props.menuStore.menuadd.name)}  onClick= { apiRequest.apiDebounce(props.menuStore.handleMenuAdd)} text="Add" type={AppConstant.POSITIVE} />
                        </div>
                    </div>
                </div>
            </Modal>
            )}
        
        </Observer>
    );
};

export default MenuAddPopup;
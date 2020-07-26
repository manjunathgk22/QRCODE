import { h, Component } from 'preact';
import Modal from '../modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import apiRequest from '../../api/apiRequest';
import {Observer} from 'mobx-react';

const MenuCategoryShowPopup = (props) => {
    return (
        <Observer>
            {()=>(
                <Modal onOverlayClick={()=>{props.menuStore.showMenuCategoryShowPopup = false}}>
            <div className=" white-bg border-radius-sm modal-wrapper">
                <div className="flex space-between padding-bottom-sm padding-lg border-bottom">
                    <h3 className="text-center one-flex no-vertical-margin">Add Menu Category</h3>
                    <span style={{fontSize:22}} className="pointer" onClick={()=>{props.menuStore.showMenuCategoryShowPopup = false}}>X</span>
                </div>
                <div className="modal-body padding-lg">
                    <div className="flex ">
                        <div className="flex min-width-150" >Name:</div>
                        <Input placeholder="Enter name" value={props.menuStore.menuaddCategory.name} onChange={({target})=>{props.menuStore.menuaddCategory.name = target.value}} style={{width:200}}/>
                    </div>
                    <div className="flex margin-top-lg">
                        <div className="flex min-width-150" >Description:</div>
                        <Input placeholder="Enter Description" type="textArea" style={{width:300, maxWidth:400, maxHeight:250}} value={props.menuStore.menuaddCategory.description} onChange={({target})=>{props.menuStore.menuaddCategory.description = target.value}}/>
                    </div>
                    <div className="margin-top-lg flex align-center">
                        <Button type="button" disabled={props.menuStore.menuAddLoading || (!props.menuStore.menuaddCategory.name)}  onClick= { ()=>{props.menuStore.createMenuCategory(true)}} text="Add" type={AppConstant.POSITIVE} />
                    </div>
                </div>
            </div>
        </Modal>
            )}
        </Observer>
        
    );
};

export default MenuCategoryShowPopup;
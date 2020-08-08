import { h, Component } from 'preact';
import {inject, Observer} from 'mobx-react';
import './Style.scss';
import BaseView from '../Baseview/BaseView';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Toast from '../Toast/Toast';
import {useEffect} from 'preact/hooks';
import Dropdown from '../Dropdown/Dropdown';
import Modal from '../modal/Modal'
import AppConstant from '../../constant/AppConstant';
import Loader from '../Loader/Loader'
import {get} from 'lodash';
const Qrcodes = (props) => {
    useEffect(() => {
        props.qrcodeStore.getQrCodes(true, true)
    }, [])
    return (
        <BaseView>
        <Observer>
            {()=>(<div className="padding-lg qrcode-wrapper">
                <Card classname="padding-lg">
                    <div className="flex flex-column">
                        <h2 className="text-center">Generate QR Code</h2>
                        <div className="flex align-center">
                            <div className="min-width-150 margin-right-md">Number of Qrcodes :</div>
                            <Input onChange={({target})=>{ target.value = target.value.replace(/[a-zA-Z]/, ''); props.qrcodeStore.numberOfqrcodes =target.value }} placeholder="Enter Number" value={props.qrcodeStore.numberOfqrcodes}  style={{width:200}}/>
                        </div>
                        <div className="flex align-center margin-top-md">
                            <div className="min-width-150 margin-right-md">Enter the type:</div>
                            <Input onChange={({target})=>{ props.qrcodeStore.typerOfqrcodes =target.value }} placeholder="Eg: Table, Room, etc" value={props.qrcodeStore.typerOfqrcodes}  style={{width:200}}/>
                        </div>
                        <div className="margin-left-lg align-center flex margin-top-lg padding-top-md">
                            <Button text="generate"  onClick={()=>{props.qrcodeStore.generateQrcodes()}} disabled={!props.qrcodeStore.numberOfqrcodes || !props.qrcodeStore.typerOfqrcodes}/>
                        </div>
                    </div>
                    <div className="flex margin-top-md flex-wrap">
                        {
                            props.qrcodeStore.qrcodes.slice().map(qrcode=>(<div className="margin-top-md margin-right-md qrcode">
                                <div>
                                    {qrcode.restaurant.name}
                                </div>
                                <div className="margin-top-sm">
                                    {qrcode.name}
                                </div>
                                <div>
                                    Code: <strong className="red-text">{qrcode.id}</strong> 
                                </div>
                                <div className="">
                                    <img src={qrcode.dataUrl}/>
                                </div>
                                <div className="margin-top-sm">
                                    Menu: <Dropdown onClick={(menu)=>{props.qrcodeStore.handleMenuSelect(menu,qrcode)}} options={props.qrcodeStore.menus} selected={get(qrcode, 'menu.name', 'Select')} />
                                </div>
                                <div className="margin-top-sm">
                                    Service: <Dropdown onClick={(service)=>{props.qrcodeStore.handleServiceSelect(service,qrcode)}} options={props.qrcodeStore.services} selected={get(qrcode, 'service.name', 'Select')} />
                                </div>
                                <div className="margin-top-lg">
                                    <span className="font-12">Scan Qrcode or go to <strong>{`__STATIC__`} and enter the code</strong></span>
                                </div>
                            </div>))
                        }
                    </div>
                    <Toast toastList={props.qrcodeStore.toastMessage} />
                    {props.qrcodeStore.showMenuConfirm ? <Modal onOverlayClick={()=>{props.qrcodeStore.showMenuConfirm = false}}><div className="padding-lg border-radius-sm white-bg">
                        <div className="">
                            <h3>Are You Sure You want to change the Menu?</h3>
                        </div>
                        <div className="flex margin-top-lg align-center">
                            <div className="margin-right-md">
                                <Button disabled={props.qrcodeStore.apiLoading} text="Yes" onClick={props.qrcodeStore.handleMenuChange} type={AppConstant.POSITIVE_GREEN}/>
                            </div>
                            <div className="margin-left-md">
                                <Button disabled={props.qrcodeStore.apiLoading} text="No" onClick={()=>{props.qrcodeStore.showMenuConfirm = false}} type={AppConstant.RED}/>
                            </div>
                            
                        </div>
                        <div className="flex align-center margin-top-md">
                            {props.qrcodeStore.apiLoading ? <Loader style={{height:30}}/>: null}
                        </div>
                        </div></Modal>:false}
                        

                        {props.qrcodeStore.showServiceConfirm ? <Modal onOverlayClick={()=>{props.qrcodeStore.showServiceConfirm = false}}><div className="padding-lg border-radius-sm white-bg">
                        <div className="">
                            <h3>Are You Sure You want to change the Service?</h3>
                        </div>
                        <div className="flex margin-top-lg align-center">
                            <div className="margin-right-md">
                                <Button disabled={props.qrcodeStore.apiLoading} text="Yes" onClick={props.qrcodeStore.handleServiceChange} type={AppConstant.POSITIVE_GREEN}/>
                            </div>
                            <div className="margin-left-md">
                                <Button disabled={props.qrcodeStore.apiLoading} text="No" onClick={()=>{props.qrcodeStore.showServiceConfirm = false}} type={AppConstant.RED}/>
                            </div>
                            
                        </div>
                        <div className="flex align-center margin-top-md">
                            {props.qrcodeStore.apiLoading ? <Loader style={{height:30}}/>: null}
                        </div>
                        </div></Modal>:false}
                </Card>
            </div>)}
        </Observer>
        </BaseView>
    );
};

export default inject('qrcodeStore') (Qrcodes);
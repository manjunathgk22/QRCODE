import { h, Component } from 'preact';
import {inject, Observer} from 'mobx-react';
import './Style.scss';
import BaseView from '../Baseview/BaseView';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Toast from '../Toast/Toast';
import {useEffect} from 'preact/hooks';

const Qrcodes = (props) => {
    useEffect(() => {
        props.qrcodeStore.getQrCodes()
    }, [])
    return (
        <BaseView>
        <Observer>
            {()=>(<div className="padding-lg">
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
                    <Toast toastList={props.qrcodeStore.toastMessage} />
                </Card>
            </div>)}
        </Observer>
        </BaseView>
    );
};

export default inject('qrcodeStore') (Qrcodes);
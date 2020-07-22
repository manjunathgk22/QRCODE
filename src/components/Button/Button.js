import { h, Component } from 'preact';
import './style.scss'
import AppConstant from '../../constant/AppConstant';
export default function Button({text='click', onClick=()=>{}, type=AppConstant.POSITIVE, disabled=false, ...props}) {
    let typeClass="";
    switch(type){
        case AppConstant.POSITIVE:
            typeClass="btn-positive";
            break;
        case AppConstant.RED:
            typeClass="btn-red";
            break;
        case AppConstant.POSITIVE_GREEN:
            typeClass="btn-positive-green";
            break;
    }
    return (
    <button className={`btn ${typeClass}`} onClick={onClick} disabled={disabled} {...props}> {typeof text === 'string'? text:text()}</button>
    )
}

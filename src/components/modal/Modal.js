import { h, Component } from 'preact';
import './Style.scss';

export default function Modal({showModal=false, onOverlayClick=()=>{}, ...props}) {
    return (
        <div className="full-width-height-viewport flex align-center z-index-100 overlay fixed modal" onClick={onOverlayClick}>
            <div onClick={(event)=>{event.stopPropagation()}}>
            {props.children}
            </div>
        </div>
    )
}

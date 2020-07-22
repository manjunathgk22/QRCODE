import { h, Component } from 'preact';

import './style.scss';

export default function Card(props) {
    return (
        <div className={`card ${props.classname}`} style={props.style}>
            {props.children}
        </div>
    )
}

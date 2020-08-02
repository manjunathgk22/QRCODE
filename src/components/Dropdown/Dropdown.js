import { h, Component } from 'preact';
import './Style.scss'
import {useEffect, useState} from 'preact/hooks';

export default function Dropdown({options=[], onClick=()=>{}, selected}) {

    const [selectedOption, setselectedOption] = useState(selected);
    useEffect(() => {
        if(!selected)
            options.some(item =>{
                if(item.selected){
                    setselectedOption(item.name)
                    return true;
                }
                return false;
            })
    }, [options])
    useEffect(() => {
        setselectedOption(selected)
    }, [selected])
    return (
        <div className="dropdown">
            <button className="dropbtn">{`${selectedOption} `}</button>
            <div className="dropdown-content">
                {options.map((item,index)=>(<span key={index} onClick={()=>{onClick(item)}}>{item.name}</span>))}
            </div>
        </div>
    )
}

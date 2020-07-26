import { h, Component } from 'preact';
import './Style.scss'
import {useEffect, useState} from 'preact/hooks';

export default function DropdownMultiSelect({options=[], onChange=()=>{}}) {

    const [selectedOptionCount, setselectedOption] = useState(0);
    useEffect(() => {
        let i =0;
        options.map(item =>{
            if(item.selected){
                ++i;
            }
        })
        setselectedOption(i)
    }, [options])
    return (
        <div className="dropdownmulti">
            <div className="flex">
                <div className="dropdownbtn">Select </div>
                <div className="margin-left-md" style={{fontSize:12}}>{`${selectedOptionCount} Selected`}</div>
            </div>
            <div className="dropdown-content">
                <div className="flex border-bottom">
                    <input onChange={()=>{onChange('ALL')}} type={"checkbox"} checked={options.length === selectedOptionCount} id={'all'}  name="multicheckbox" />
                    <label for={'all'}>Select All</label>
                    <div className="margin-left-md" style={{fontSize:12}}>{`${selectedOptionCount} Selected`}</div>
                </div>
                {options.map((item,index)=>(<div key={index}  className="flex border-bottom padding-xs"><input onChange={()=>{onChange(index)}} type={"checkbox"} checked={item.selected} id={index}  name="multicheckbox" /><label for={index}>{item.name}</label></div>))}
            </div>
        </div>
    )
}

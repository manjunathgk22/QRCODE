import { h, Component } from 'preact';
import './Style.scss'
import {Observer, inject} from 'mobx-react';
import Navigation from '../../util/Navigation';

const Sidebar = (props) => {
    
    return (
        <Observer>
            {()=>(
                <div className="sidebar">
                    {props.baseStore.sidebar.map(item=><div onClick={()=>{
                        if(!item.isSelected){
                            Navigation.push(item.path)
                        }
                    }} className={`sidebar-item ${item.isSelected? 'active':''}`}>{item.name}</div>)}
                </div>
            )}
        </Observer>
        
    );
};

export default inject('baseStore') (Sidebar);
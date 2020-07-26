import { h, Component } from 'preact';

import './Style.scss';
import logo from '../../assets/qr_icon.png'
import BaseStore from '../../Stores/BaseStore';
import Navigation from '../../util/Navigation';
import AppUtility from '../../util/AppUtility';

function Header() {
    return (
        <div className="header shadow">
            <img className="image-icon" src={logo}/>
            <h5 className="pointer" onClick={()=>{
                BaseStore.LOGINDATA = null;
                localStorage.removeItem('LOGINDATA');
                Navigation.push('/login')
            }}>Logout</h5>
        </div>
    )
}

export default Header
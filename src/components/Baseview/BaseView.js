

import { h, Component } from 'preact';
import {inject, Observer} from 'mobx-react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Style.scss'
//Wrap this component on all page level components handle common data from here
class BaseView extends Component {
    render({}, {}) {
        return (
            <Observer>
            {()=>(<div>
                <Header/>
                <Sidebar/>
                <div className="body-container">
                {this.props.children}
                </div>
                
            </div>)}
        </Observer>
        );
    }
}

export default inject('dashboardStore') (BaseView);

import { h, Component } from 'preact';
import {inject,Observer} from 'mobx-react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import './Style.scss';
import Toast from '../Toast/Toast';

class CustomerDashboard extends Component {
    render({}, {}) {
        return (
            <Observer>
            {()=>(
                    <div className="flex-container">
                        <div className="flex ">
                            <div className="flex min-width-150" >Enter QR ID:</div>
                            <Input value={this.props.customerStore.idValue} onChange={({target})=>{this.props.customerStore.idValue=target.value}}  placeholder="Enter QR ID" />
                        </div>
                        
                        <div className="margin-top-lg flex align-center">
                            <Button onClick={this.props.customerStore.handleSubmit} disabled={!this.props.customerStore.idValue} type="button"  text="Submit" type={AppConstant.POSITIVE} />
                        </div>
                        <Toast toastList={this.props.customerStore.toastMessage} />
                    </div>
            )}
        
        </Observer>
        );
    }
}


export default inject('customerStore') (CustomerDashboard);
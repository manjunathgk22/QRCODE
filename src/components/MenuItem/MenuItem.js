import { h, Component } from 'preact';
import { inject, Observer } from 'mobx-react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import Veg from '../../assets/vegetarian-icon.png';
import './Style.scss';
import ItemQuantity from './ItemQuantity';

class MenuItem extends Component {
    render({ }, { }) {
        return (
            <Observer>{() => (
                <div>
                    <Card className="border-bottom padding-xs">
                        <div>
                            <img class="zoom" src={`__STATIC__${this.props.menuitem.images}`} />
                        </div>
                        <div>
                            <div className="flex">
                                <img className="generic-icon" src={Veg} />
                                <h3 className="no-vertical-margin">{this.props.menuitem.name}</h3>
                            </div>
                            <div className="flex space-between">
                                <p>{this.props.menuitem.description}</p>
                            </div>
                            <div className="flex space-between" style={{marginRight:"28px"}}>
                                <p>Rs.{this.props.menuitem.cost}</p>
                                {this.props.menuitem.quantity ? <div><ItemQuantity {...this.props} /></div> : <Button onClick={() => { this.props.customerStore.handleadd(this.props.categoryIndex, this.props.menuItemindex) }} type="button" text="Add" type={AppConstant.POSITIVE_GREEN} />}
                            </div>
                        </div>
                    </Card>
                </div>
            )}</Observer>
        );
    }
}

export default inject('customerStore')(MenuItem);
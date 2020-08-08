import { h, Component } from 'preact';
import { inject, Observer } from 'mobx-react';
import './Style.scss';
import Card from '../Card/Card';
import Button from '../Button/Button';
import AppConstant from '../../constant/AppConstant';
import Veg from '../../assets/vegetarian-icon.png';
import ItemQuantity from '../MenuItem/ItemQuantity';

class CartDetails extends Component {
    componentDidMount() {
        this.props.customerStore.calculateSubTotal()
    }
    render({ }, { }) {
        return (
            <Observer>{() => (
                <div className="cartdetails white-bg">
                    <Card className="border-bottom padding-xs">
                        <h2>Cart</h2>
                        {
                            this.props.customerStore.menuData[0].menucategories.map((menucategory, categoryIndex) => (menucategory.menuitems.map((menuitem, menuItemIndex) => {
                                if (menuitem.quantity > 0) {
                                    return (
                                        <div>
                                            <div className="flex space-between">
                                                <div className="flex">
                                                    <img className="generic-icon" src={Veg} />
                                                    <h3 className="no-vertical-margin">{menuitem.name}</h3>
                                                </div>
                                                <div className="flex flex-column">
                                                    <ItemQuantity categoryIndex={categoryIndex} menuItemindex={menuItemIndex} menuitem={menuitem} />
                                                </div>
                                                <div className="flex flex-column">
                                                    <p id="cost">Rs.{menuitem.cost * menuitem.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })))
                        }
                        <div className="flex space-between">
                            <h3 style={{ marginRight: "10px" }}>Subtotal</h3>
                            <h3>Rs. {this.props.customerStore.subTotal}</h3>
                        </div>
                        <div className="flex" style={{ justifyContent: "center" }}>
                            <Button onClick={this.props.customerStore.handleSubmit} disabled={!this.props.customerStore.idValue} type="button"  text="Submit" type={AppConstant.POSITIVE}  text="Checkout" />
                        </div>
                    </Card>
                </div>
            )}</Observer>
        );
    }
}

export default inject('customerStore')(CartDetails);
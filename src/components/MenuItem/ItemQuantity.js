import { h, Component } from 'preact';
import { inject, Observer } from 'mobx-react';
//import './Style.scss';


class ItemQuantity extends Component {
    render({ }, { }) {
        return (
            <Observer>{() => (
                <div className="item-quantity-wrapper">
                    <div className="value-button" id="decrease"  onClick={() => { this.props.customerStore.handleadd(this.props.categoryIndex, this.props.menuItemindex, 'sub'/* , this.props.calculateSubTotal */)}}>-</div>
                    <input type="number" id="number" value={this.props.menuitem.quantity} {...this.props} />
                    <div className="value-button" id="increase"  onClick={() => { this.props.customerStore.handleadd(this.props.categoryIndex, this.props.menuItemindex/* , '', this.props.calculateSubTotal */)}}>+</div>
                </div >
            )
    }</Observer>
        );
    }
}

export default inject('customerStore') (ItemQuantity);
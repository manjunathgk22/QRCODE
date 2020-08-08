import { h, Component } from 'preact';
import { inject, Observer } from 'mobx-react';
import MenuItem from '../MenuItem/MenuItem';
import './Style.scss';
import cart from '../../assets/cartnew.png';
import Navigation from "../../util/Navigation";
import Button from '../Button/Button';
import customerStore from '../../stores/customerStore';


class CustomerMenu extends Component {

    render({ }, { }) {
        return (
            <Observer>{() => (
                <div className="customermenu white-bg">
                    <div className="flex" id="cart">
                    <img style={{width:"30px",height:"30px"}} src={cart} onClick={()=>{
                Navigation.push('/customer/cartmodel') 
            }} /> <sup style={{color: "#fd3753",fontsize:"20px"}}>{this.props.customerStore.totalCount}</sup>
                    </div>
                    {
                        this.props.customerStore.menuData[0].menucategories.map((menucategory, categoryIndex) => (
                            <div>
                                <h2>{menucategory.name}</h2>
                                {
                                    menucategory.menuitems.map((menuitem, menuItemindex) => (
                                        <MenuItem menuitem={menuitem} menuItemindex={menuItemindex} categoryIndex={categoryIndex}  {...this.props} />
                                    ))
                                }
                            </div>
                        ))}
                </div>
            )}</Observer>
        );
    }
}

export default inject('customerStore')(CustomerMenu);
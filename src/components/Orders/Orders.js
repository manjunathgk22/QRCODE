import { h, Component } from 'preact';
import './Style.scss';
import {Observer, inject} from 'mobx-react';
import { Suspense, lazy, useEffect } from 'preact/compat';
import BaseView from '../Baseview/BaseView';
import Card from '../Card/Card';
import AppUtility from '../../util/AppUtility';
import AppConstant from '../../constant/AppConstant';
import Tooltip from '../Tooltip/Tooltip';
import Button from '../Button/Button'
import Loader from '../Loader/Loader'
import Toast from '../Toast/Toast'
const Orders = (props) => {
    useEffect(() => {
        props.orderStore.getDetails()
        
    }, [])
    return (
        <BaseView>
            <Observer>
                {()=>(<div className="padding-lg flex orders-wrapper">
                    <Card classname="padding-lg tables margin-right-md fit-content">
                            <h3 className="no-top-margin border-bottom">Tables</h3>
                            <div className="flex flex-wrap">
                                {props.orderStore.tableData.map((table, tableIndex)=> <div 
                                    className={`padding-sm margin-right-sm each-table margin-bottom-md ${table.selected? 'table-selected':''}`}
                                    onClick={()=>{props.orderStore.handletableClick(tableIndex)}}>
                                    <div>
                                        <h4 className="no-vertical-margin" style={{marginBottom:5}}>
                                            {AppUtility.Capitalize(table.name)}
                                        </h4>
                                        {table.orders.length? 
                                            <div>
                                                {Object.keys(table.ordercount).map(key => <div className="flex space-between">
                                                    <div className="flex align-center">
                                                        <div className="order-color" style={{backgroundColor:table.ordercount[key].color}}></div>
                                                        <div className="margin-right-md">
                                                            {AppUtility.Capitalize(key)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {table.ordercount[key].count}
                                                    </div>
                                                </div>)}
                                            </div>
                                        : <span className="font-12">No order Placed</span>
                                        }
                                    </div>
                                </div>)}
                            </div>
                    </Card>
                    <Card classname="padding-lg orders one-flex fit-content flex-column">
                            <h3 className="no-top-margin border-bottom full-width">Orders</h3>
                            
                            <div className="flex flex-column orders">
                                {props.orderStore.tableData.map((table, tableindex)=>
                                        table.selected? table.orders.length? 
                                            <div>
                                                {table.showBillButton ?<div className="margin-bottom-sm"><Button onClick={()=>{props.orderStore.createBill(table)}} text="Create Bill" /></div> :null}
                                            {table.orders.map(order => <div className={`flex space-between border padding-sm border-radius-sm each-order margin-bottom-md margin-top-md`}>
                                                <div className="flex flex-wrap">
                                                    <div className="flex flex-basis-50 margin-bottom-sm align-items-center ">
                                                        <div className="font-13 margin-right-sm"> Ordered Item:</div>
                                                        <div className="bold"><Tooltip text={AppUtility.Capitalize(order.name.length>12? `${order.name.substr(0,10)}..`:order.name )} desc={order.name} /></div>
                                                    </div>
                                                    <div className="flex flex-basis-50 margin-bottom-sm align-items-center ">
                                                        <div className="font-13 margin-right-sm">Quantity:</div>
                                                        <div className="bold">{(order.quantity)}</div>
                                                    </div>
                                                    <div className="flex flex-basis-50 margin-bottom-sm align-items-center ">
                                                        <div className="font-13 margin-right-sm">Total Cost:</div>
                                                        <div className="bold">₹{(order.totalcost)}</div>
                                                    </div>
                                                    <div className="flex flex-basis-50 margin-bottom-sm align-items-center ">
                                                        <div className="font-13 margin-right-sm">Status:</div>
                                                        <div className="bold" style={{color: AppConstant.ORDER_STATUS[order.status].color}}>{AppUtility.Capitalize(order.status)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    {order.next_buttons.map(buttonText => <div className="margin-top-sm margin-right-sm"><Button onClick={()=>{props.orderStore.handleOrderStatusUpdate(buttonText, order)}} type={AppConstant.ORDER_STATUS_BUTTON[buttonText].type} text={buttonText} /></div> )}
                                                    {props.orderStore.apiLoading && props.orderStore.selectedOrderId === order.id ? <Loader  style={{height:24}} />: null}
                                                </div>
                                            </div> ) }</div>
                                        :<div>No orders placed</div> :null
                                    )}
                            </div>
                            <Toast toastList={props.orderStore.toastMessage} />
                    </Card>
                    
                </div>)}
            </Observer>
        </BaseView>
    );
};

export default inject('orderStore') (Orders);


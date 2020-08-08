
import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import AppConstant from '../constant/AppConstant';
import {cloneDeep} from 'lodash';
import check from '../assets/check.png'
import error from '../assets/error.png'
export default class LoginStore extends BaseStore{
    @observable isLoading = false;
    @observable errorMessage = '';
    @observable tableData = []
    @observable apiLoading = true
    @observable toastMessage = []
    @observable selectedOrderId = null;
    @observable billLoading = false
    @observable billData = ''
    setIsLoading(value){
        this.isLoading = value;
    }
    @action orderCount = async()=>{
        this.tableData.map(order=>{
            let ordercount = cloneDeep(AppConstant.ORDER_STATUS);
            // delete ordercount.BILLED;
            order.orders.map(tableOrder =>{
                ordercount[tableOrder.status].count  += 1;
                tableOrder.next_buttons=[]
                tableOrder.next_buttons = AppConstant.ORDER_STATUS[tableOrder.status].next_buttons
            })
            order.ordercount = ordercount
            if(ordercount.SERVED.count > 0){
                order.showBillButton = true
            }
        })
        this.tableData[0].selected = true;
        console.log(JSON.parse(JSON.stringify(this.tableData)))
        this.tableData = [...this.tableData]
    }
    @action getDetails = async()=>{
        try {
            this.isLoading = true;
            const response = await apiRequest.callAPIs(apiRequest.getAllCurrentOrders());
            if(response.status === apiRequest.STATUS.SUCCESS){
                this.tableData = response.data.response;
                this.orderCount()
            }else{

            }   
            this.isLoading = false
        } catch (error) {
            
        }
    }
    @action handletableClick = (index)=>{
        this.tableData.map((table, i) =>{
            if(i === index)
                table.selected = true;
            else    
                table.selected = false;
            return table
        })
    }
    @action addOrderFromNotif = async(orderData)=>{
        this.tableData.some(table =>{
            if(table.id === orderData.qrcode_id){
                table.orders.push(orderData)
                return true
            }
            return false
        })
        debugger;
        this.orderCount()
        
    }
    @action handleOrderStatusUpdate = async(button_text, order)=>{
        this.apiLoading = true
        const json ={
            id: order.id,
            status: AppConstant.ORDER_STATUS_BUTTON[button_text].label
        }
        this.selectedOrderId = order.id
        const response = await apiRequest.callAPIs(apiRequest.updateOrderStatus(json))
        if(response.status === apiRequest.STATUS.SUCCESS){
            this.tableData.some(tableOrder => {
                let found = false
                tableOrder.orders.some( singleOrder =>{
                    if(singleOrder.id === order.id){
                        singleOrder.status = response.data.order.status;
                        found = true;
                        return found;
                    }
                    return found
                })
                return found
            })
            this.tableData = [...this.tableData]
            this.orderCount()
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Success",
                    description: "Updated Successfully",
                    backgroundColor: "#0cb88f",
                    icon: check,
                },
            ]
        }else{
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Failure",
                    description: "Something Went Wrong",
                    backgroundColor: "#fd3753",
                    icon: error,
                },
            ]
        }
        this.apiLoading = false
    }

    @action createBill = async(table)=>{
        this.billLoading = true
        const json = {
            qrcode_id: table.id
        }
        const response = await apiRequest.callAPIs(apiRequest.createBill(json))
        if(response.status === apiRequest.STATUS.SUCCESS){
            this.billData = response.data.billCreated
            this.getDetails()
            // this.tableData.map(table =>[
            //     table.orders.map(order =>{
            //         order.status = AppConstant.ORDER_STATUS.BILLED.label
            //     })
            // ])
            // this.tableData = [...this.tableData]
            // this.orderCount();
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Success",
                    description: "Updated Successfully",
                    backgroundColor: "#0cb88f",
                    icon: check,
                },
            ]
        }else{
            this.toastMessage = [
                {
                    id: Date.now(),
                    title: "Failure",
                    description: "Something Went Wrong",
                    backgroundColor: "#fd3753",
                    icon: error,
                },
            ]
        }
        this.billLoading = false
    }
}
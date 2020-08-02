import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import AppConstant from '../constant/AppConstant';
import {cloneDeep} from 'lodash';

export default class LoginStore extends BaseStore{
    @observable isLoading = false;
    @observable errorMessage = '';
    @observable tableData = []
    setIsLoading(value){
        this.isLoading = value;
    }
    @action orderCount = async()=>{
        this.tableData.map(order=>{
            let ordercount = cloneDeep(AppConstant.ORDER_STATUS);
            delete ordercount.BILLED;
            order.orders.map(tableOrder =>{
                ordercount[tableOrder.status].count  += 1;
            })
            order.ordercount = ordercount
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
}
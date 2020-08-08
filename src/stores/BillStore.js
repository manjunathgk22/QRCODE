import BaseStore from "./BaseStore";
import {observable, action} from "mobx";
import apiRequest from '../api/apiRequest';
import Navigation from '../util/Navigation';
import AppUtility from '../util/AppUtility';
import {subscribeApi} from '../notif';
import { format } from 'date-fns'
import AppConstant from '../constant/AppConstant';
export default class BillStore extends BaseStore{
    @observable isLoading = false;
    @observable username = '';
    @observable password = '';
    @observable errorMessage = '';
    @observable billData = [];
    @observable columns = [];
    @observable pageNo = 0;
    @observable totalCount = 0
    @observable maxSinglePageItems = 10;
    @observable blurTable  = false
    setIsLoading(value){
        this.isLoading = value;
    }
    @action getData = async()=>{
        this.isLoading = true;
        const response = await apiRequest.callAPIs(apiRequest.getAllBills())
        if(response.status === apiRequest.STATUS.SUCCESS){
            this.billData = response.data.response.map((bill, index) =>{
                return{
                    ...bill,
                    createdAt: format(new Date(bill.createdAt), 'MMM dd yyyy'),
                    siNo: ++index
                }
            });
            this.totalCount = this.billData.length;
            if(this.columns.length === 0){
                this.columns = Object.keys(response.data.response[0]).map(key =>{
                    let data = {
                        label: AppConstant.BILLTABLEMAPPING[key],
                        id: key,
                    }
                    if(key === 'orders'){
                        data.JSXFormat = (value, rowData)=>(
                            <div>
                                {value.map(order=>(<div className="flex space-between margin-top-sm ">
                                    <div className="flex">
                                        name: <span className="bold margin-left-sm">{order.name}</span>
                                    </div>
                                    <div className="flex">
                                        quantity: <span className="bold margin-left-sm">{order.quantity}</span>
                                    </div>
                                    <div className="flex">
                                        totalcost: <span className="bold margin-left-sm">{order.totalcost}</span>
                                    </div>
                                </div>))}
                                <div className="margin-top-sm">
                                    Total Orders: <span className="bold margin-left-sm">{value.length}</span>
                                </div>
                            </div>
                        )
                    }
                    if(key === 'qrcode'){
                        data.JSXFormat = (qrcode, rowData)=>(
                            <div>
                                <div className="flex  ">
                                    name: <span className="bold margin-left-sm">{qrcode.name}</span>
                                </div>
                                <div className="flex  margin-top-sm">
                                    ID: <span className="bold margin-left-sm">{qrcode.id}</span>
                                </div>
                            </div>
                        )
                    }
                    return data
                })
                this.columns = [{
                    label: 'Serial No',
                    id: 'siNo',
                    },
                    ...this.columns,
                ]
            }
        }
    }
}
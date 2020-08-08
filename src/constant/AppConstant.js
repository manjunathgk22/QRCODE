
const POSITIVE =  'positive'
const POSITIVE_GREEN = 'positive_green'
const RED ='red'

const SIDEBAR = [{
    name:'Dashboard',
    path:'/dashboard',
    isSelected: true
},{
    name:'Qrcodes',
    path:'/qrcodes',
    isSelected: false
},{
    name:'Menus',
    path:'/menus',
    isSelected: false
},{
    name:'Services',
    path:'/services',
    isSelected: false
},{
    name:'Orders',
    path:'/orders',
    isSelected: false
},{
    name:'Bills',
    path:'/bills',
    isSelected: false
},{
    name:'Restaurant',
    path:'/restaurant',
    isSelected: false
}]
const ORDER_STATUS = {
    OPEN : {label:'OPEN', color:'#fd3753', count:0, next_buttons: ['ACCEPT', 'DECLINE']},
    ACCEPTED: {label:'ACCEPTED', color:'#FF8303', count:0, next_buttons: ['PREPARING']} ,
    PREPARING: {label:'PREPARING', color:'#ffc400', count:0, next_buttons: ['SERVED']} ,
    SERVED: {label:'SERVED', color:'#0cb88f', count:0, next_buttons:[]} ,
    BILLED: {label:'BILLED', color:'#5fcace', count:0, next_buttons:[]},
    DECLINED: {label:'DECLINED', color:'#787878', count:0, next_buttons:[]},
}
const ORDER_STATUS_BUTTON = {
    OPEN : {label:'OPEN', type : POSITIVE },
    ACCEPT: {label:'ACCEPTED',type : POSITIVE_GREEN } ,
    PREPARING: {label:'PREPARING', type : POSITIVE} ,
    SERVED: {label:'SERVED', type : POSITIVE} ,
    BILL: {label:'BILLED', type : POSITIVE},
    DECLINE: {label:'DECLINED', type : RED},
}

const BILLTABLEMAPPING = {
    id: "Bill ID",
    amount: 'Amount',
    createdAt: 'Created At',
    discount: 'Discount',
    orders: 'Orders',
    qrcode: 'Table'
}
export default {
    POSITIVE,
    POSITIVE_GREEN,
    RED,
    SIDEBAR,
    ORDER_STATUS,
    ORDER_STATUS_BUTTON,
    BILLTABLEMAPPING
}
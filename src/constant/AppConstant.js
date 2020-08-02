
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
    name:'Restaurant',
    path:'/restaurant',
    isSelected: false
}]
const ORDER_STATUS = {
    OPEN : {label:'OPEN', color:'#fd3753', count:0},
    ACCEPTED: {label:'ACCEPTED', color:'#FF8303', count:0} ,
    PREPARING: {label:'PREPARING', color:'#ffc400', count:0} ,
    SERVED: {label:'SERVED', color:'#0cb88f', count:0} ,
    BILLED: {label:'BILLED', color:'#5fcace', count:0} 
}
export default {
    POSITIVE,
    POSITIVE_GREEN,
    RED,
    SIDEBAR,
    ORDER_STATUS
}
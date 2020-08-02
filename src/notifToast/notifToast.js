import check from '../assets/check.png'
import {isArray, random} from 'lodash';
import {subscribeApi} from '../notif';

const notifToast = async (props)=>{
        debugger
    const data = props.event ? props.event.data: null;

    if(data){
        switch(data.action){
            case 'CREATED':
                if(data.model === "ORDER"){
                    const orderData = JSON.parse(data.data)
                    props.orderStore.addOrderFromNotif(orderData)
                    
                }
                break;
            case 'pushsubscriptionchange':
                subscribeApi()
                break;
        }
    }

    props.baseStore.toastMessage.push({
        id: random(1,1000),
        title: props.event.data.title,
        description: "",
        backgroundColor: "#0cb88f",
        icon: check
    })
    props.baseStore.toastMessage = [...props.baseStore.toastMessage]
}
export default notifToast
import { h, Component } from 'preact';
import { Suspense, useState, useEffect } from 'preact/compat';


import "./style.scss";

const Toast = props => {
    const { toastList=[], position = 'topRight', autoDelete = true, dismissTime= 3000, onClose = ()=>{} } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);

        // eslint-disable-next-line
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        
        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime, list]);

    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        const toastItem = list[listItemIndex]
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
        onClose(toastItem)
    }

    return (
            <div className={`notificationContainer ${position}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className={`notificationImage`}>
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className={`notificationTitle`} >{toast.title}</p>
                                <p className={`notificationMessage`}>
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
    );
}


export default Toast;

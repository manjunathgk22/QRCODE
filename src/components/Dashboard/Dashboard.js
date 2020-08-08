import { h, Component } from 'preact';
import './Style.scss';
import {Observer, inject} from 'mobx-react';
import Header from '../Header/Header';
import { Suspense, lazy, useEffect } from 'preact/compat';
import Sidebar from '../Sidebar/Sidebar';
import BaseView from '../Baseview/BaseView';
import Card from '../Card/Card';
import BaseStore from '../../stores/BaseStore';
import Toast from '../Toast/Toast';


const Dashboard = (props) => {
    useEffect(() => {
        props.dashboardStore.handleNotif()
    }, [])
    return (
        <BaseView>
            <Observer>
                {()=>(<div className="padding-lg qrcodes-wrapper">
                    <Card classname="padding-lg">
                        <div>qrcodes</div>
                    </Card>
                    <Toast toastList={props.dashboardStore.toastMessage} />
                </div>)}
            </Observer>
        </BaseView>
    );
};

export default inject('dashboardStore') (Dashboard);


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
import DataTable from '../DataTable/DataTable'

const Bills = (props) => {
    useEffect(() => {
        props.billStore.getData()
    }, [])
    return (
        <BaseView>
            <Observer>
                {()=>(<div className="padding-lg qrcodes-wrapper">
                    <Card classname="padding-lg">
                        <DataTable
                            onRowClick = {(rowData, index)=>{
                            }}
                            initPageNumber = {props.billStore.pageNo}
                            column={props.billStore.columns}
                            data={props.billStore.billData.slice(props.billStore.pageNo * props.billStore.maxSinglePageItems, (props.billStore.pageNo * props.billStore.maxSinglePageItems) + props.billStore.maxSinglePageItems)}
                            onPageChange = {(pageNo)=>{
                                // props.billStore.handlepageChange(pageNo)
                                debugger
                                props.billStore.pageNo = pageNo

                            }}
                            totalCount={props.billStore.totalCount}
                            maxSinglePageItems = {props.billStore.maxSinglePageItems}
                            blurTable = {props.billStore.blurTable}
                            showSearch={false}
                        />
                    </Card>
                    <Toast toastList={props.billStore.toastMessage} />
                </div>)}
            </Observer>
        </BaseView>
    );
};

export default inject('billStore') (Bills);


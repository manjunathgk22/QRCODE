import { h, Component } from 'preact';
import BaseView from '../Baseview/BaseView';
import {useEffect} from 'preact/hooks'
import {Observer, inject} from 'mobx-react';
import Card from '../Card/Card';
import DetailsLoader from '../SkeletonLoaders/DetailsLoader'
import './Style.scss'
import Eye from '../../assets/eye.svg'
import Toast from '../Toast/Toast';
import MenuAddPopup from './MenuAddPopup'
import MenuCategoryAddPopup from './MenuCategoryAddPopup';
import MenuItemAddPopup from './MenuItemAddPopup';
import MenuCategoryShowPopup from './MenuCategoryShowPopup';
import MenuItemShowPopup from './MenuItemShowPopup';
const MenuDashboard = (props) => {
    useEffect(() => {
        props.menuStore.qrstoreRef = props.qrcodeStore
        // props.menuStore.getmenus()
        props.menuStore.getData()
    }, [])
    return (
        <BaseView>
        {
            <Observer>{()=>(
                <div className="padding-lg menu-dashboard">
                    <Card classname="padding-lg">
                        {
                            props.menuStore.isLoading ?<DetailsLoader/>:
                            <div className="flex">
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Menu</h4>
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{props.menuStore.handleShowMenuAddpopup()}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Menu</p>
                                    <div className="menu-column">
                                    {
                                        props.menuStore.menuData.map((menu, index) =><Card onClick={()=>{props.menuStore.handleCardClick('MENU', index)}} classname={`padding-md margin-bottom-md shadow-light menucard ${index === props.menuStore.selectedMenuIndex? 'active':''}`}>
                                            
                                            <div className="flex space-between margin-top-sm ">
                                                
                                                <Eye onClick={()=>{props.menuStore.handleShowMenuPopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {menu.name}
                                                </div>
                                                <span className="font-12 text">
                                                    {`${menu.menucategories.length} ${menu.menucategories.length>1? 'Categories': 'Category'}`}
                                                </span>
                                            </div>
                                        </Card>)
                                    }
                                    </div>
                                    
                                </div>
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Menu Category</h4>
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{ props.menuStore.showMenuCategoryAddPopup = true}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Menu Category</p>
                                    <div className="menu-column">
                                        
                                    {
                                        props.menuStore.menuData.length && props.menuStore.menuData[props.menuStore.selectedMenuIndex] && props.menuStore.menuData[props.menuStore.selectedMenuIndex].menucategories.map((menuCategory, index) =><Card onClick={()=>{props.menuStore.handleCardClick("MENUCATEGORY", index)}} classname={`padding-md margin-bottom-md shadow-light menucard ${index === props.menuStore.selectedMenuCategoryIndex? 'active':''}`}>
                                            <div className="flex space-between margin-top-sm ">
                                                <Eye onClick={()=>{props.menuStore.handleShowMenuCategoryPopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {menuCategory.name}
                                                </div>
                                                <span className="font-12 text">
                                                    {`${menuCategory.menuitems.length} ${menuCategory.menuitems.length>1? 'Items': 'Item'}`}
                                                    
                                                </span>
                                            </div>
                                        </Card>)
                                    }
                                    </div>
                                    
                                </div>
                                <div className=" one-flex flex-column margin-right-lg gray-bg padding-md border-radius-sm fit-content relative padding-bottom-lg">
                                    <h4 className="no-top-margin padding-bottom-md ">Menu Item</h4> 
                                    <p className="add-button no-bottom-margin text-light" onClick={()=>{ props.menuStore.showMenuItemAddPopup = true}}> <span className="text-light" style={{fontSize:20}}>+</span> Add Menu Item</p>
                                    <div className="menu-column">
                                    {
                                        props.menuStore.menuData.length && props.menuStore.menuData[props.menuStore.selectedMenuIndex].menucategories.length &&  props.menuStore.menuData[props.menuStore.selectedMenuIndex].menucategories[props.menuStore.selectedMenuCategoryIndex].menuitems && props.menuStore.menuData[props.menuStore.selectedMenuIndex].menucategories[props.menuStore.selectedMenuCategoryIndex].menuitems.map((menuItem, index) =><Card onClick={()=>{props.menuStore.handleCardClick('MENUITEM', index)}} classname={`padding-md margin-bottom-md shadow-light menucard ${menuItem.selected? 'active':''}`}>
                                            <div className="flex space-between margin-top-sm ">
                                                <Eye onClick={()=>{props.menuStore.handleShowMenuItemPopup(index)}} className="eye-icon" />
                                                <div className="text">
                                                    {menuItem.name}
                                                </div>
                                            </div>
                                        </Card>)
                                    }
                                    </div>
                                    
                                </div>
                            </div>
                        }
                        <Toast toastList={props.menuStore.toastMessage} />
                    </Card>
                    {/* MENU ADD POPUP */}
                    {props.menuStore.showMenuAddPopup ?<MenuAddPopup {...props}/>:null}

                    {/* MENU CATEGORY POPUP */}
                    {props.menuStore.showMenuCategoryAddPopup? <MenuCategoryAddPopup {...props} /> :null}

                    {/* MENU ITEM POPUP */}
                    {props.menuStore.showMenuItemAddPopup?<MenuItemAddPopup {...props} />:null}

                    {/* MENU SHOW POPUP */}
                    {props.menuStore.showMenuShowPopup ?<MenuAddPopup isShowPopup={true} {...props}/>:null}

                    {/* MENU CATEGORY SHOW POPUP */}
                    {props.menuStore.showMenuCategoryShowPopup ?<MenuCategoryShowPopup isShowPopup={true} {...props}/>:null}

                    {/* MENU ITEM SHOW POPUP */}
                    {props.menuStore.showMenuItemShowPopup ?<MenuItemShowPopup isShowPopup={true} {...props}/>:null}

                </div>
            )}</Observer>
        }
        </BaseView>
        
    );
};

export default inject('menuStore', 'qrcodeStore') (MenuDashboard);
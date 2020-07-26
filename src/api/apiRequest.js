import Config from "../config/urlConfig";
import Axios from "axios";
import AppUtility from '../util/AppUtility';

const STATUS = {
    SUCCESS: 200,
    ERROR: "error",
  };

  const apiResponse = {
    status: STATUS,
    data: null,
    error: null,
  };

  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "okhttp",
  };

  const imageUploadHeaders = {
    "Content-Type": "multipart/form-data",
    "User-Agent": "okhttp",
  }
  const userApiClient = Axios.create({
    baseURL: Config.API_URL,
    headers: headers,
    // timeout: 3000,
  });

const userApiClientUpload = Axios.create({
    baseURL: Config.API_URL,
    headers: imageUploadHeaders,
    // timeout: 3000,
  });
  
  const callAPIs = async (apiMethodToCall)=> {
    try {
      let response = { ...(await apiMethodToCall) };
      if (response.status === 200) {
        if (response.data.error != null) {
          apiResponse.status = STATUS.ERROR;
          apiResponse.error = response.data.error;
          return apiResponse;
        } else {
          apiResponse.status = STATUS.SUCCESS;
          apiResponse.data = response.data;
          return apiResponse;
        }
      } else {
        apiResponse.status = STATUS.ERROR;
        apiResponse.error = response.data.error;
        return apiResponse;
      }
    } catch (error) {
      apiResponse.status = STATUS.ERROR;
      apiResponse.error = error.toString();
      return apiResponse;
    }
  }

 const apiDebounce =  (func) => {
    let loading
    return async function() {
      const context = this
      const args = arguments
      if(loading)
          return 
      loading=true
      await (func.apply(context, args))
      loading = false;
    }
  }

function loginSubmit(json){
    return userApiClient.post('public/login/', json)
}

function generateQrcode(json){
  return userApiClient.post('private/qrcode/generate/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}

function getRestaurantDetails(){
  return userApiClient.get('private/restaurant/getrestaurant', {headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}

function uploadImage (data){
  return userApiClient.post('private/uploadStatic' ,data,  {headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function postRestaurantDetail(data){
  return userApiClient.put('private/restaurant/update', data, {headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function loginSubmit(json){
  return userApiClient.post('public/login/', json)
}

function getmenus(){
  return userApiClient.get('private/menus/getmenus', {headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}

function createMenu(json){
  return userApiClient.post('private/menu/create/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function updateMenu(json){
  return userApiClient.put('private/menu/update/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function createMenuCategory(json){
  return userApiClient.post('private/menucategory/create/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function updateMenuCategory(json){
  return userApiClient.put('private/menucategory/update/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function createMenuItem(json){
  return userApiClient.post('private/menuitem/create/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function updateMenuItem(json){
  return userApiClient.put('private/menuitem/update/', json,{headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}
function getQrcodes(){
  return userApiClient.get('private/qrcode/getqrcodes', {headers: {
    Authorization: "Bearer " + AppUtility.getToken(),
    }})
}

export default {
  STATUS,
  callAPIs,
  apiDebounce,
  loginSubmit,
  getRestaurantDetails,
  uploadImage,
  postRestaurantDetail,
  generateQrcode,
  getmenus,
  createMenu,
  getQrcodes,
  createMenuCategory,
  updateMenuCategory,
  createMenuItem,
  updateMenu,
  updateMenuItem
}
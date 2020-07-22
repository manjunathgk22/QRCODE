import Config from "../config/urlConfig";
import Axios from "axios";
import AppUtility from '../util/AppUtility';

const STATUS = {
    SUCCESS: "success",
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
  const userApiClient = Axios.create({
    baseURL: Config.API_URL,
    headers: headers,
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


export default {
  STATUS,
  callAPIs,
  apiDebounce,
  loginSubmit,
}
import {observable} from "mobx";
import AppConstant from '../constant/AppConstant';

class BaseStore {
    @observable isLoading = false;
    @observable loadingMessage = "";
    @observable showTryAgain = false;
    @observable errorText = "";
    static LOGINDATA = null;
    @observable sidebar = AppConstant.SIDEBAR

    resetValues() {
        this.isLoading = false;
        this.loadingMessage = "";
        this.showTryAgain = false;
        this.errorText = "";
    }
}

export default BaseStore;

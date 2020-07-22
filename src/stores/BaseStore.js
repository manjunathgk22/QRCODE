import {observable} from "mobx";

class BaseStore {
    @observable isLoading = false;
    @observable loadingMessage = "";
    @observable showTryAgain = false;
    @observable errorText = "";
    static LOGINDATA = null;

    resetValues() {
        this.isLoading = false;
        this.loadingMessage = "";
        this.showTryAgain = false;
        this.errorText = "";
    }
}

export default BaseStore;

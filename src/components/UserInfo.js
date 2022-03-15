export default class UserInfo {
    constructor({UserNameSelector, UserActivitySelector}) {
        this.userName = document.querySelector(UserNameSelector);
        this.userActivity = document.querySelector(UserActivitySelector);
    }

    getUserInfo() {

    }

    setUserInfo() {
        this.name = this.userName.textContent;
        this.activity = this.userActivity.textContent;
    }
}
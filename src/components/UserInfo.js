export default class UserInfo {
    constructor({UserNameSelector, UserActivitySelector, UserAvatarSelector}) {
        this.userName = document.querySelector(UserNameSelector);
        this.userActivity = document.querySelector(UserActivitySelector);
        this.userAvatar = document.querySelector(UserAvatarSelector);
    }

    getUserInfo() {
        return {userName: this.name, userActivity: this.activity, userAvatar: this.avatar, userId: this.id}
    }

    setUserInfo(newName, newActivity, newAvatar) {
        this.userName.textContent = newName;
        this.userActivity.textContent = newActivity;
        this.userAvatar.src = newAvatar;
    }
}
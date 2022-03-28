export default class UserInfo {
    constructor({UserNameSelector, UserActivitySelector, UserAvatarSelector}) {
        this.userName = document.querySelector(UserNameSelector);
        this.userActivity = document.querySelector(UserActivitySelector);
        this.userAvatar = document.querySelector(UserAvatarSelector);
    }

    getUserInfo() {// возвращает объект с данными пользователя
        return {userName: this.name, userActivity: this.activity, userAvatar: this.avatar, userId: this.id}
    }

    setUserInfo(newName, newActivity, newAvatar) { // принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
        this.userName.textContent = newName;
        this.userActivity.textContent = newActivity;
        this.userAvatar.src = newAvatar;
    }
}
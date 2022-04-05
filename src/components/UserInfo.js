export default class UserInfo {
  constructor({userNameSelector, userActivitySelector, userAvatarSelector}) {
    this.userName = document.querySelector(userNameSelector);
    this.userActivity = document.querySelector(userActivitySelector);
    this.userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {// возвращает объект с данными пользователя
    return {userName: this.name, userActivity: this.about, userAvatar: this.avatar, userId: this.id}
  }

  setUserInfo(newName, newActivity, newAvatar, newId) { // принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    this.userName.textContent = newName;
    this.userActivity.textContent = newActivity;
    this.userAvatar.src = newAvatar;
    this.userId = newId;
  }

  renderAvatar(newAvatar = avatar) {
    this.userAvatar.src = newAvatar;
  }

  renderUser(newName = username, newActivity = userabout) {
    this.userName.textContent = newName;
    this.userActivity.textContent = newActivity;
  }
}
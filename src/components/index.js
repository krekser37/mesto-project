import '../pages/index.css'; 
import {options, validationSettings, formElement, container, handleLikes, handleImageClick, elementTemplate, avatarButton, deleteButton} from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';

import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js';
import Section from './Section.js';

let currentUserId;

export const api = new Api(options);

export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle',
    UserAvatarSelector: '.profile__image'
    }
);
//Попап открытия картинки
export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 
imagePopup.setEventListeners();



//Попап редактирования профиля
const profileEditButton = document.querySelector('.profile__button_is_edit');
const profileEditPopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit, profileEditButton);
profileEditPopup.setEventListeners();

//Попап редактирования аватара 
const avatarEditButton = document.querySelector('.profile__edit-image');

const avatarEditPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit, avatarEditButton);
avatarEditPopup.setEventListeners();

avatarButton.addEventListener('click', () => {
  avatarEditPopup.openPopup()});


//Отправка формы редактирования аватара
export function handleAvatarFormSubmit(data) {
  let newAvatarinfo = {avatar: data.url}; 
  const text = "Сохранение...";
  this.renderLoading(true, text);
  api
  .changeAvatar(newAvatarinfo)
  .then((res) => {
  userInfo.renderAvatar(res.avatar);
  this.closePopup()})
  .catch((err) => console.log(err))
  .finally(() => this.renderLoading(false))
};



const createCard = (data) => {
  const card = new Card(data, elementTemplate, currentUserId, handleLikes, handleImageClick, openDeletePopup).defineCard();
  return card;
};
//Попап добавления карточки 
const newCardPopupOpenButton = document.querySelector('.profile__button_is_add');
console.log(newCardPopupOpenButton);
export const newCardPopup = new PopupWithForm('.popup_type_add', handleNewCardFormSubmit, newCardPopupOpenButton);
newCardPopup.setEventListeners(); 

export const formValidator = new FormValidator(validationSettings, formElement); 









export function handleFormSubmit(data) {
  let cardInfo = { name: data.title, link: data.activity}
  api
  .addNewCard(cardInfo)
  .then(card => {
    const createdCard = createCard(card);
    defineSection.addItem(createdCard)
  })
};

export const defineSection = (cards) => {
  const section = new Section ({
  data: cards,
  renderer: (item) => {
      const realCard = createCard(item);
      section.addItem(realCard);
  },
  containerSelector: container});
  console.log(section.owner); 
  return section;
};

//Отправка формы новой карточки
function handleNewCardFormSubmit(data) {
  let cardInfo = { name: data.title, link: data.activity}
  api
  .addNewCard(cardInfo)
  .then(card => {
    const createdCard = createCard(card);
    container.prepend(createdCard);
  })
  .then(()=> this.closePopup())
  return cardInfo;
};

//Отправка формы редактирования профиля
function handleProfileFormSubmit(data) {
let profileInfo = {name: data.name, about: data.activity}
api
.addUser(profileInfo)
.then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about)
})
.then (() => this.closePopup())
return profileInfo;
};



let section;
  
 api.getAppInfo()
  .then(([cards, user]) => {
    console.log(cards);
    console.log(user);
    userInfo.setUserInfo(user.name, user.about, user.avatar);// принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    userInfo.getUserInfo(user);// возвращает объект с данными пользователя
    currentUserId = user._id;
    console.log(currentUserId);
    section = defineSection(cards);
    section.renderAll();
  })
  .catch(err => console.log(err));


  //Попап удаления картинки

  export function openDeletePopup(id, element) {
    console.log(id);
    console.log(element);
    confirmDeletePopup.openPopup(id, element);
  }
  export const confirmDeletePopup = new PopupWithForm('.popup_type_delete', handleDeleteFormSubmit, deleteButton);
  
  function handleDeleteFormSubmit(id, element) {
    console.log(element);
    const text = "Удаляем...";
    confirmDeletePopup.renderLoading(id, text);
    api
    .deleteCardServer(id)
    .then(() => {
        element.remove();
      })
    .then(() => {
        confirmDeletePopup.closePopup();
      })
    .catch((err) => console.log(err))
    .finally(() => {
      const text = "Да";
        confirmDeletePopup.renderLoading(text);
      })
    }

confirmDeletePopup.setEventListeners();



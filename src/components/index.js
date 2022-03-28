import '../pages/index.css'; 
<<<<<<< HEAD
import {options, validationSettings, formElement, container, handleLikes, handleImageClick, elementTemplate, submitAvatarForm} from './utils.js';
=======
import {options, validationSettings, formElement, container, handleLikes, handleImageClick, elementTemplate, } from './utils.js';
>>>>>>> fab94b3cc6ecaf4acdaaa0d2f96c3c4753212ed0

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
<<<<<<< HEAD
import PopupWithForm from './PopupWithForm.js';
=======
import PopupWithForm from './PopupWithForm.js'
>>>>>>> fab94b3cc6ecaf4acdaaa0d2f96c3c4753212ed0

let currentUserId;

export const api = new Api(options);

  

export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle',
    UserAvatarSelector: '.profile__image'
    }
);

export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 
imagePopup.setEventListeners();

export const avatarPopup = new PopupWithForm('.popup_type_avatar', submitAvatarForm); 
avatarPopup.setEventListeners();


//Попап добавления карточки 
const newCardpopupOpenButton = document.querySelector('.profile__button_is_add')
const newCardPopup = new PopupWithForm('.popup_type_add', handleNewCardFormSubmit, newCardpopupOpenButton);
newCardPopup.setEventListeners();


//Попап редактирования профиля
const profileEditButton = document.querySelector('.profile__button_is_edit')
const profileEditPopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit, profileEditButton);
profileEditPopup.setEventListeners();

//Попап редактирования аватара 
const avatarEditButton = document.querySelector('.profile__edit-image')
const avatarImageSelector = document.querySelector('.profile__image')
const avatarEditPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit, avatarEditButton)
avatarEditPopup.setEventListeners();

export const formValidator = new FormValidator(validationSettings, formElement); 


const createCard = (data) => {
  const card = new Card(data, elementTemplate, currentUserId, handleLikes, handleImageClick, handleDeleteCard).defineCard();
  return card;
}




export const defineSection = (cards) => {
  const section = new Section ({
  data: cards,
  renderer: (item) => {
      const realCard = createCard(item);
      
      section.addItem(realCard);
  },
  containerSelector: container});
/*   console.log(section.owner); */
  return section;
}

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
}

//Отправка формы редактирования профиля
function handleProfileFormSubmit(data) {
let profileInfo = {name: data.name, about: data.activity}
api
.addUser(profileInfo)
.then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about)
})
.then (() => this.closePopup())
}

//Отправка формы редактирования аватара
function handleAvatarFormSubmit(data) {
  
  let newAvatarinfo = {avatar: data.url}
  api.changeAvatar(newAvatarinfo)
  .then((avatarData) => {
    avatarImageSelector.src = avatarData.avatar
  })
  .then(() => this.closePopup())
}

function handleDeleteCard(card) {
  api.deleteCardServer(card._cardId)
  .then(() => {
    card._deleteCard()
  })
}


  let section;
  
 api.getAppInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar);// принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    userInfo.getUserInfo(user);// возвращает объект с данными пользователя
    currentUserId = user._id;
    console.log(user);
    section = defineSection(cards);
    section.renderAll();
  })
  .catch(err => console.log(err));





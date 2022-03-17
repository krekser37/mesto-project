import '../pages/index.css'; 
import {options, validationSettings, formElement, containerSelector} from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Сard from './Card.js';
import PopupWithImage from './PopupWithImage.js';

export const api = new Api (options);
export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle'
    }
);

export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 

export const formValidator = new FormValidator(validationSettings, formElement); 

export const cardSection = new Section ({
     items: api.getCards(), 
     renderer: () => {
         const newCard = new Card (cards, selector, currentUserId) ;
         return newCard;
     },
    containerSelector});

 const getAppInfo = () => {
    return Promise.all([api.getUser(), api.getCards()])
    .catch(err => console.log(err))
  }; 

  
/* let currentUserId = "";
let isLiked = ""; */

 getAppInfo()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.activity, user.avatar),//установить пользователя
    userInfo.getUserInfo(),// получить пользователя
    cardSection.renderAll(cards),
    cardSection.addItem(item)
  })
  .catch(err => console.log(err)); 
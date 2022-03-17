import '../pages/index.css'; 
import {options, validationSettings, formElement, containerSelector} from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Сard from './Card.js';
import PopupWithImage from './PopupWithImage.js';

 const api = new Api(options);

console.log(api)

export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle',
    UserAvatarSelector: '.profile__image'
    }
);

export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 

export const formValidator = new FormValidator(validationSettings, formElement); 

/* const defaultCardList = new Section({
  data: items,
  renderer: (item) => {
    const card = new DefaultCard(item, '.default-card');
    const cardElement = card.generate();
    defaultCardList.setItem(cardElement);
  }
}, cardListSelector); */


export const cardSection = new Section ({
     items: api.getCards(), 
     renderer: (cards) => {
         const newCard = new Card (cards, selector);
         return newCard;
     },
    containerSelector});

 const getAppInfo = () => {
    return Promise.all([api.getUser(), api.getCards()])
    .catch(err => console.log(err))
  }; 
  

 getAppInfo()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.activity, user.avatar),//установить пользователя
    userInfo.getUserInfo(),// получить пользователя
    cardSection.renderAll(cards)
  })
  .catch(err => console.log(err)); 
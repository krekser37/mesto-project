import '../pages/index.css'; 
import {options, validationSettings, formElement, container, handleLikes, elementTemplate} from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';

let currentUserId;

export const api = new Api(options);

  

export const userInfo = new UserInfo (
    {UserNameSelector: '.profile__title',
    UserActivitySelector: '.profile__subtitle',
    UserAvatarSelector: '.profile__image'
    }
);

export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 

export const formValidator = new FormValidator(validationSettings, formElement); 


const createCard = (data) => {
  const card = new Card(data, elementTemplate, currentUserId, handleLikes).defineCard();
  return card;
}

export onst defineSection = (cards) => {
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

  let section;
  
 api.getAppInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.activity, user.avatar);//установить пользователя
    userInfo.getUserInfo();// получить пользователя
    currentUserId = user._id;
    console.log(currentUserId);
    section = defineSection(cards);
    section.renderAll();
  })
  .catch(err => console.log(err));
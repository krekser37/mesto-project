import '../pages/index.css'; 
import {options, validationSettings, formElement, container, handleLikes, handleImageClick, profileEditButton, profileAddButton, elementTemplate, avatarButton, deleteButton, avatarForm, profileEditForm, addCardForm} from './utils.js';

import Api from './Api.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';
import PopupConfirm from './PopupConfirm.js';
import Section from './Section.js';

let currentUserId;
let section;

export const api = new Api(options);

export const userInfo = new UserInfo (
    {userNameSelector: '.profile__title',
    userActivitySelector: '.profile__subtitle',
    userAvatarSelector: '.profile__image'
    }
);

const createCard = (data) => {
  const card = new Card(data, elementTemplate, currentUserId, handleLikes, handleImageClick, openDeletePop).defineCard();
  return card;
};

//Попап открытия картинки
export const imagePopup = new PopupWithImage('.popup_type_image', '.element__image_type_popup', '.element__text_type_popup'); 
imagePopup.setEventListeners();

//Попап редактирования профиля
const profileEditPopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit, profileEditButton);
profileEditPopup.setEventListeners();

//Попап редактирования аватара 
const avatarEditPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit, avatarButton);
avatarEditPopup.setEventListeners();

//Попап добавления карточки 
const newCardPopupOpenButton = document.querySelector('.profile__button_is_add');

export const newCardPopup = new PopupWithForm('.popup_type_add', handleNewCardFormSubmit, newCardPopupOpenButton);
newCardPopup.setEventListeners(); 

//Попап удаления карточки
export const confirmDeletePopup = new PopupConfirm('.popup_type_delete', handleCardDelete );
confirmDeletePopup.setEventListeners();

function openDeletePop(card) {
  confirmDeletePopup.openPopup(card)
}

//Удаление карточки
function handleCardDelete(card) {
  const text = "Удаление...";
  this.renderLoading(true, text);
  api.deleteCardServer(card._cardId)
  .then(() => {
    card.deleteCard();
    confirmDeletePopup.closePopup()
  })
  .catch((err) => console.log(err))
  .finally(() => {
    
    this.renderLoading(true, "Да")
  })
  
}

/* export function handleFormSubmit(data) {
  const cardInfo = { name: data.title, link: data.activity}
  api
  .addNewCard(cardInfo)
  .then(card => {
    const createdCard = createCard(card);
    defineSection.addItem(createdCard)
  })
}; */

export const defineSection = (cards) => {
  const section = new Section ({
  data: cards,
  renderer: (item) => {
      const realCard = createCard(item);
      section.addItem(realCard);
  },
  container: container});
  return section;
};

//Отправка формы новой карточки
function handleNewCardFormSubmit(data) {
  const cardInfo = { name: data.title, link: data.activity};
  const text = "Сохранение...";
  this.renderLoading(true, text);
  api
  .addNewCard(cardInfo)
  .then(card => {
    const createdCard = createCard(card);
    container.prepend(createdCard);
  })
  .then(()=> this.closePopup())
  .catch((err) => console.log(err))
  .finally(() => this.renderLoading(false))
};

//Отправка формы редактирования аватара
export function handleAvatarFormSubmit(data) {
  const newAvatarinfo = {avatar: data.url}; 
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

//Отправка формы редактирования профиля
function handleProfileFormSubmit(data) {
const profileInfo = {name: data.name, about: data.activity}
const text = "Сохранение...";
this.renderLoading(true, text);
api
.addUser(profileInfo)
.then((userData) => {
  userInfo.renderUser(userData.name, userData.about)
})
.then (() => this.closePopup())
.finally(() => this.renderLoading(false))
};


api.getAppInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar);// принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    userInfo.getUserInfo(user);// возвращает объект с данными пользователя
    currentUserId = user._id;
    section = defineSection(cards);
    section.renderAll();
  })
  .catch(err => console.log(err));


//Валидация форм

    //Валидация формы аватара
/* export const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();

    //Валидация формы добавления карты
export const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
addCardFormValidator.enableValidation();

    //Валидация формы редактирования профиля
export const profileEditFormValidator = new FormValidator(validationSettings, profileEditForm);
profileEditFormValidator.enableValidation(); */


 
profileEditButton.addEventListener('click', () => {
  formValidators['form-edit'].resetValidation();
  /* profileEditFormValidator.resetValidation(); */
  profileEditPopup.openPopup();
  setInputValues();
});  

profileAddButton.addEventListener('click', () => {
  formValidators['form-add'].resetValidation();
  /* addCardFormValidator.resetValidation(); */
  newCardPopup.openPopup();
}); 

avatarButton.addEventListener('click', () => {
  formValidators['form-avatar'].resetValidation();
  /* avatarFormValidator.resetValidation(); */
  avatarEditPopup.openPopup();
}); 

const formValidators = {};

// Включение универсальной валидации
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
/* И теперь можно использовать валидаторы для деактивации кнопки и тд */
/* formValidators[ profileForm.getAttribute('name') ].resetValidation(); */

// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
/* formValidators['profile-form'].resetValidation() */